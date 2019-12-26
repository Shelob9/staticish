import React from 'react';
import Heading from './Primative/Heading';
/**
 * The header element of a post with title and possibly other meta
 *
 * @param props
 */
export default function PostHeader(props: {
  title: string;
  level: 1 | 2 | 3;
  tw?: string;
  renderTitle?: (props: { title: string }) => Element;
}) {
  const { title, level, tw, renderTitle } = props;
  return (
    <header>
      <Heading level={level} tw={tw ? tw : 'font-bold text-xl mb-2'}>
        {renderTitle ? renderTitle({ title: title }) : title}
      </Heading>
    </header>
  );
}
