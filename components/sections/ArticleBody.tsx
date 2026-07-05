import ReactMarkdown from "react-markdown";

export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="prose-cair max-w-none">
      <ReactMarkdown
        components={{
          h2: (props) => <h2 className="mt-8 font-display text-2xl text-[var(--forest-deep)]" {...props} />,
          h3: (props) => <h3 className="mt-6 font-display text-xl text-[var(--forest-deep)]" {...props} />,
          p: (props) => <p className="mt-4 leading-relaxed text-foreground/80" {...props} />,
          a: (props) => <a className="text-[var(--accent)] underline underline-offset-2" {...props} />,
          blockquote: (props) => (
            <blockquote
              className="mt-6 border-l-2 border-[var(--gold)] pl-5 italic text-foreground/70"
              {...props}
            />
          ),
          ul: (props) => <ul className="mt-4 list-disc space-y-1.5 pl-5 text-foreground/80" {...props} />,
          ol: (props) => <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-foreground/80" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
