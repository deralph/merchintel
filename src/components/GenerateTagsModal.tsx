import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Check } from "lucide-react";
import { toast } from "sonner";

interface Tag {
  uid: string;
  programming_url: string;
  material: string;
  sequence: number;
}

interface GenerateTagsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tags: Tag[];
  campaignName: string;
}

const GenerateTagsModal = ({ open, onOpenChange, tags, campaignName }: GenerateTagsModalProps) => {
  const [markedAsProgrammed, setMarkedAsProgrammed] = useState(false);

  const handleDownloadCSV = () => {
    const headers = ["UID", "Programming URL", "Material", "Sequence"];
    const rows = tags.map(tag => [
      tag.uid,
      tag.programming_url,
      tag.material,
      tag.sequence.toString()
    ]);

    const csv = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${campaignName.replace(/\s+/g, "_")}_tags.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("CSV downloaded successfully");
  };

  const handleMarkAsProgrammed = () => {
    // Mock API call
    setMarkedAsProgrammed(true);
    toast.success("Tags marked as programmed");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generated Tags for {campaignName}</DialogTitle>
          <DialogDescription>
            Use these URLs to program your NFC tags. Download the CSV for bulk programming.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {tags.length} tags generated
            </p>
            <div className="flex gap-2">
              <Button onClick={handleDownloadCSV} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
              <Button 
                onClick={handleMarkAsProgrammed} 
                size="sm"
                disabled={markedAsProgrammed}
              >
                {markedAsProgrammed ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Marked as Programmed
                  </>
                ) : (
                  "Mark as Programmed"
                )}
              </Button>
            </div>
          </div>

          <div className="border border-border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 text-sm font-medium">UID</th>
                  <th className="text-left p-3 text-sm font-medium">Programming URL</th>
                  <th className="text-left p-3 text-sm font-medium">Material</th>
                  <th className="text-left p-3 text-sm font-medium">Seq</th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag) => (
                  <tr key={tag.uid} className="border-t border-border">
                    <td className="p-3 text-sm font-mono">{tag.uid}</td>
                    <td className="p-3 text-sm">
                      <a 
                        href={tag.programming_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-hover underline"
                      >
                        {tag.programming_url}
                      </a>
                    </td>
                    <td className="p-3 text-sm">{tag.material}</td>
                    <td className="p-3 text-sm">{tag.sequence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateTagsModal;
