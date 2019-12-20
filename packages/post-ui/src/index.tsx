import * as React from 'react';
import { htmlToMarkdown } from '@staticish/wp-api-to-static';
// Delete me
export const Thing = () => {
  const [html, setHtml] = React.useState<string>(
    'the snozzberries taste like snozzberries'
  );
  React.useEffect(() => {
    let cancelled = false;

    htmlToMarkdown(`# Title`).then(newHtml => {
      if (!cancelled) {
        setHtml(newHtml);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function createMarkup() {
    return { __html: html };
  }

  return <div dangerouslySetInnerHTML={createMarkup()} />;
};
