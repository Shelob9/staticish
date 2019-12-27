import React from 'react';
import { renderFromRawBlocks } from './factories/blocksToContent';
/**
 * Props for the "renderContent" render prop.
 */
export type renderContentProps = {
  content: string;
  tw?: string;
};

export type renderPropForContent = (props: renderContentProps) => JSX.Element;

/**
 * Display a posts' content
 *
 * @param props
 */
export default function PostContent(props: {
  content: string;
  tw?: string;
  renderContent?: renderPropForContent;
}) {
  const { content, tw, renderContent } = props;
  function createMarkup() {
    return { __html: renderFromRawBlocks(content) };
  }

  if (renderContent) {
    return renderContent({ content, tw });
  }
  return (
    <div
      className={tw ? tw : 'text-gray-700 text-base'}
      dangerouslySetInnerHTML={createMarkup()}
    />
  );
}
