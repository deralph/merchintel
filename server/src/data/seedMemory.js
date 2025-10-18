const seedMemory = async (store) => {
  if (!store?.ensureTag) {
    return;
  }

  const { tagDataset } = await import("./demoData.js");

  for (const tag of tagDataset) {
    await store.ensureTag({
      slug: tag.uid,
      label: tag.description ?? tag.uid,
      brand: tag.experience?.brand ?? "Merchly",
      description: tag.experience?.description ?? tag.description ?? "",
      redirectUrl: tag.experience?.redirectUrl ?? "https://merchly.example/experience",
      heroImage: tag.experience?.logo ?? null,
      accentColor: "#D94F2F",
      campaign: tag.experience?.campaignName ?? tag.campaignName ?? tag.description ?? tag.uid,
      material: tag.material ?? null,
      logo: tag.experience?.logo ?? null,
      experience: tag.experience ?? null,
    });
  }
};

export default seedMemory;
