import { createElement } from 'react';
export type headingProps = {
  children: any;
  level: 1 | 2 | 3;
  tw?: string;
};
/**
 * A Heading Elelement
 *
 * @param props
 */
export default function Heading(props: headingProps) {
  const { children, level, tw } = props;

  return createElement(
    `h${level ? level : 1}`,
    {
      className: tw ? tw : 'font-bold text-xl mb-2',
    },
    children
  );
}
