import ToolCard from '../components/ToolCard';
import { tools } from '../data/tools';
import { resolveDownloadUrl } from '../lib/github';

const ToolsSection = async () => {
  const resolvedTools = await Promise.all(
    tools.map(async (tool) => {
      if (tool.status !== 'available' || !tool.downloadAssetName) {
        return tool;
      }

      const downloadUrl = await resolveDownloadUrl(tool.downloadAssetName);
      return { ...tool, downloadUrl };
    }),
  );

  const hasAvailableTool = resolvedTools.some(
    (tool) => tool.status === 'available',
  );

  return (
    <section id="tools" className="py-16 md:py-20">
      <h2 className="mb-4 text-4xl font-bold text-white">Tools</h2>
      <p className="mb-10 max-w-2xl text-justify text-secondaryText">
        Free app for business — Download, install, and run locally on your
        device.
      </p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {resolvedTools.map((tool) => (
          <ToolCard key={tool.id} {...tool} />
        ))}
      </div>
      {hasAvailableTool && (
        <div className="mt-10 rounded-xl border border-borderline bg-a3Navy p-6">
          <p className="text-justify text-secondaryText">
            <b>One tool solved part of the problem, what about the rest?</b>{' '}
            <br></br>A3 team connects the dots — consultation, integrations,
            automation and custom solution across your operations.
          </p>
          <a
            href="mailto:contact@alvinchiew.com?subject=Auto%20Email%20%E2%80%94%20Business%20inquiry"
            className="mt-4 inline-block text-a3Accent hover:underline"
          >
            Contact the A3 team →
          </a>
        </div>
      )}
    </section>
  );
};

export default ToolsSection;
