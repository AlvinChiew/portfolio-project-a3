const GITHUB_RELEASES_API =
  "https://api.github.com/repos/alvinchiew/project-a3/releases/latest";

export async function resolveDownloadUrl(downloadAssetName) {
  const fallbackUrl =
    "https://github.com/alvinchiew/project-a3/releases/latest";

  try {
    const response = await fetch(GITHUB_RELEASES_API, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return fallbackUrl;
    }

    const release = await response.json();
    const asset = release.assets?.find(
      (item) => item.name === downloadAssetName,
    );

    return asset?.browser_download_url ?? fallbackUrl;
  } catch {
    return fallbackUrl;
  }
}
