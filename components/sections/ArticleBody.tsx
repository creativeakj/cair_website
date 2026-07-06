export function ArticleBody({ html }: { html: string }) {
  return <div className="prose-cair max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
}
