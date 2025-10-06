# MerchTrace API Specification

## Overview
This document outlines the expected API endpoints for the MerchTrace platform. The frontend currently uses mock data; implement these endpoints to connect to a real backend.

## Base URL
```
Production: https://api.merchtrace.com/v1
Development: http://localhost:8080/v1
```

## Authentication
All authenticated endpoints require a Bearer token:
```
Authorization: Bearer <access_token>
```

---

## Endpoints

### 1. Scan Events

#### POST `/events/scan`
Record a scan event when a user taps an NFC tag or scans a QR code.

**Request Body:**
```json
{
  "tag_uid": "TAG-001",
  "campaign_id": "campaign_123",
  "email": "user@example.com",
  "email_consent": true,
  "location_consent": true,
  "coarse_geohash": "9q8yy",
  "timestamp": "2025-01-15T10:30:00Z",
  "user_agent": "Mozilla/5.0..."
}
```

**Response:**
```json
{
  "success": true,
  "scan_id": "scan_789",
  "redirect_url": "https://client-destination.com/landing"
}
```

**Status Codes:**
- `201`: Scan recorded successfully
- `400`: Invalid request (missing required fields)
- `404`: Tag or campaign not found
- `500`: Server error

---

### 2. Campaign Analytics

#### GET `/analytics/overview`
Get high-level analytics for a campaign.

**Query Parameters:**
- `campaign_id` (required): Campaign identifier
- `start_date` (optional): ISO 8601 date
- `end_date` (optional): ISO 8601 date

**Response:**
```json
{
  "campaign_id": "campaign_123",
  "date_range": {
    "start": "2025-01-01",
    "end": "2025-01-31"
  },
  "metrics": {
    "total_scans": 12847,
    "unique_scanners": 8392,
    "conversion_rate": 0.643,
    "avg_time_to_scan_days": 4.2
  },
  "changes": {
    "total_scans": "+23%",
    "unique_scanners": "+18%",
    "conversion_rate": "+5.2%",
    "avg_time_to_scan_days": "-12%"
  }
}
```

---

#### GET `/analytics/scan-trends`
Get time-series data for scans and conversions.

**Query Parameters:**
- `campaign_id` (required)
- `start_date`, `end_date` (optional)
- `granularity` (optional): `day`, `week`, `month` (default: `day`)

**Response:**
```json
{
  "campaign_id": "campaign_123",
  "granularity": "day",
  "data": [
    {
      "date": "2025-01-01",
      "scans": 320,
      "conversions": 205,
      "unique_scanners": 287
    },
    {
      "date": "2025-01-02",
      "scans": 445,
      "conversions": 289,
      "unique_scanners": 401
    }
  ]
}
```

---

#### GET `/analytics/top-tags`
Get the best-performing tags for a campaign.

**Query Parameters:**
- `campaign_id` (required)
- `limit` (optional): Number of results (default: 10)

**Response:**
```json
{
  "campaign_id": "campaign_123",
  "tags": [
    {
      "tag_uid": "TAG-001",
      "scans": 1247,
      "last_scan_timestamp": "2025-01-30T15:45:00Z",
      "last_location": {
        "city": "San Francisco",
        "state": "CA",
        "country": "US",
        "geohash": "9q8yy"
      }
    },
    {
      "tag_uid": "TAG-002",
      "scans": 1089,
      "last_scan_timestamp": "2025-01-30T12:30:00Z",
      "last_location": {
        "city": "Austin",
        "state": "TX",
        "country": "US",
        "geohash": "9v6jc"
      }
    }
  ]
}
```

---

#### GET `/analytics/regional-distribution`
Get scan distribution by region.

**Query Parameters:**
- `campaign_id` (required)

**Response:**
```json
{
  "campaign_id": "campaign_123",
  "regions": [
    {
      "region": "West Coast",
      "scans": 4200,
      "percentage": 32.7
    },
    {
      "region": "East Coast",
      "scans": 3100,
      "percentage": 24.1
    },
    {
      "region": "Midwest",
      "scans": 2400,
      "percentage": 18.7
    }
  ]
}
```

---

### 3. Campaign Management

#### POST `/campaigns`
Create a new campaign.

**Request Body:**
```json
{
  "name": "Summer Festival 2025",
  "description": "Track merch from our annual summer event",
  "destination_url": "https://client.com/landing",
  "start_date": "2025-06-01",
  "end_date": "2025-08-31",
  "tag_quantity": 1000,
  "consent_settings": {
    "email_required": true,
    "location_optional": true
  }
}
```

**Response:**
```json
{
  "campaign_id": "campaign_123",
  "name": "Summer Festival 2025",
  "status": "active",
  "tags_provisioned": 1000,
  "created_at": "2025-01-15T10:00:00Z",
  "qr_download_url": "https://api.merchtrace.com/v1/campaigns/campaign_123/qr-codes.zip",
  "nfc_provisioning_url": "https://api.merchtrace.com/v1/campaigns/campaign_123/nfc-batch"
}
```

---

#### GET `/campaigns/:campaign_id`
Get campaign details.

**Response:**
```json
{
  "campaign_id": "campaign_123",
  "name": "Summer Festival 2025",
  "description": "Track merch from our annual summer event",
  "destination_url": "https://client.com/landing",
  "start_date": "2025-06-01",
  "end_date": "2025-08-31",
  "status": "active",
  "tags_provisioned": 1000,
  "tags_scanned": 847,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-20T14:30:00Z"
}
```

---

#### GET `/campaigns`
List all campaigns for the authenticated client.

**Query Parameters:**
- `status` (optional): `active`, `completed`, `draft`
- `limit` (optional): Default 50
- `offset` (optional): Pagination

**Response:**
```json
{
  "campaigns": [
    {
      "campaign_id": "campaign_123",
      "name": "Summer Festival 2025",
      "status": "active",
      "total_scans": 12847,
      "start_date": "2025-06-01",
      "end_date": "2025-08-31"
    }
  ],
  "total": 15,
  "limit": 50,
  "offset": 0
}
```

---

### 4. Tag Provisioning

#### GET `/campaigns/:campaign_id/qr-codes.zip`
Download QR codes for a campaign.

**Response:** Binary ZIP file containing individual QR code images

---

#### GET `/campaigns/:campaign_id/nfc-batch`
Get NFC tag UIDs and provisioning data.

**Response:**
```json
{
  "campaign_id": "campaign_123",
  "tags": [
    {
      "tag_uid": "TAG-001",
      "nfc_identifier": "04:A2:3F:E1:2C:80:00",
      "scan_url": "https://merchtrace.app/scan/TAG-001"
    },
    {
      "tag_uid": "TAG-002",
      "nfc_identifier": "04:B3:4E:D2:1D:91:01",
      "scan_url": "https://merchtrace.app/scan/TAG-002"
    }
  ]
}
```

---

### 5. Webhooks

#### POST `/webhooks`
Configure a webhook endpoint to receive scan events in real-time.

**Request Body:**
```json
{
  "campaign_id": "campaign_123",
  "url": "https://client.com/webhooks/scan-events",
  "events": ["scan.created", "scan.converted"],
  "secret": "whsec_abc123xyz"
}
```

**Response:**
```json
{
  "webhook_id": "wh_456",
  "campaign_id": "campaign_123",
  "url": "https://client.com/webhooks/scan-events",
  "events": ["scan.created", "scan.converted"],
  "status": "active",
  "created_at": "2025-01-15T10:00:00Z"
}
```

**Webhook Payload Example:**
```json
{
  "event": "scan.created",
  "timestamp": "2025-01-30T15:45:00Z",
  "data": {
    "scan_id": "scan_789",
    "tag_uid": "TAG-001",
    "campaign_id": "campaign_123",
    "email": "user@example.com",
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "US",
      "geohash": "9q8yy"
    }
  }
}
```

---

### 6. CSV Exports

#### GET `/analytics/export`
Export analytics data as CSV.

**Query Parameters:**
- `campaign_id` (required)
- `start_date`, `end_date` (optional)
- `format`: `csv` (default), `json`

**Response:** CSV file download with columns:
```
scan_id, tag_uid, timestamp, email, city, state, country, conversion, user_agent
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Campaign ID is required",
    "details": {
      "field": "campaign_id",
      "reason": "missing_field"
    }
  }
}
```

**Common Error Codes:**
- `INVALID_REQUEST`: Malformed request
- `UNAUTHORIZED`: Missing or invalid authentication
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Too many requests
- `SERVER_ERROR`: Internal server error

---

## Rate Limits

- **Scan events:** 1000 requests/minute per campaign
- **Analytics endpoints:** 60 requests/minute per user
- **Campaign management:** 30 requests/minute per user

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1643025600
```

---

## Data Retention

- **Scan events:** Retained for 2 years
- **Analytics aggregates:** Retained indefinitely
- **Personal data (email):** Deleted upon user request per GDPR

---

## Security

### Coarse Geolocation
- Never store raw GPS coordinates
- Use geohash precision 5 (±2.4km accuracy)
- Aggregate to city/region level for display

### Consent Management
- Email consent required for all scans
- Location consent optional
- Consent timestamps recorded
- User can revoke consent via privacy portal

### Authentication
- OAuth 2.0 with JWT tokens
- Token expiry: 1 hour
- Refresh token expiry: 30 days

---

## Testing

### Mock Data Seeds
Included in `/src/pages/` components:
- 30 days of scan data (12,847 total scans)
- 5 regional distributions
- 5 top-performing tags
- Time-series data with conversions

### Test Campaigns
```
campaign_123: "Summer Festival 2025"
tag_uid: "TAG-001" to "TAG-005"
```

---

## Integration Checklist

- [ ] Implement POST `/events/scan` for scan recording
- [ ] Connect GET `/analytics/*` endpoints to dashboard
- [ ] Add campaign CRUD operations
- [ ] Configure webhook endpoints
- [ ] Set up CSV export functionality
- [ ] Implement authentication flow
- [ ] Add error handling and retry logic
- [ ] Test rate limiting
- [ ] Verify GDPR compliance
- [ ] Deploy to production environment
