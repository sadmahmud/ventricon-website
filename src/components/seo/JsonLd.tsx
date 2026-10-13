/**
 * Renders JSON-LD structured data.
 *
 * Server component: the payload is serialised at build time, so there is no
 * client-side cost. `</script>` sequences are escaped to prevent the payload
 * from ever breaking out of the script tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // Content is generated server-side from typed objects, never user input.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
