import { WpApiPost, WpApiMedia, WpApiTaxonomy, WpApiUser } from './wpTypes';

function stripTrailingSlash(str: string): string {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
}
/**
 * Find the file for content
 *
 * @param item The post|media|user we are getting file path for
 * @param directoryPath The directory static export type json|markdown is stored in
 * @param extension The file extension
 */
export const filePath = (
  item: WpApiPost | WpApiMedia,
  directoryPath: string,
  extension: string
): string => {
  return `${stripTrailingSlash(directoryPath)}/${item.type}/${
    'md' === extension ? item.slug : item.id
  }.${extension}`;
};

/**
 * Find the file for taxonomy term content
 *
 * @param item The term we are getting file path for
 * @param directoryPath The directory static export type json|markdown is stored in
 * @param extension The file extension
 */
export const termFilePath = (
  item: WpApiTaxonomy,
  directoryPath: string,
  extension: string
): string => {
  return `${stripTrailingSlash(directoryPath)}/${item.taxonomy}/${
    'md' === extension ? item.slug : item.id
  }.${extension}`;
};

/**
 * Find the file for user content
 *
 * @param item The user we are getting file path for
 * @param directoryPath The directory static export type json|markdown is stored in
 * @param extension The file extension
 */
export const userFilePath = (
  item: WpApiUser,
  directoryPath: string,
  extension: string
): string => {
  return `${stripTrailingSlash(directoryPath)}/user/${
    'md' === extension ? item.slug : item.id
  }.${extension}`;
};
