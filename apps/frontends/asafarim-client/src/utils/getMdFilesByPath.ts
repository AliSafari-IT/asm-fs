export function getMdFilesByPath(pattern: 'ChangeLogs' | 'TechDocs' | 'LegalDocs') {
  const paths = {
    'ChangeLogs': '/ChangeLogs/*.md',
    'TechDocs': '/TechDocs/**/*.md',
    'LegalDocs': '/LegalDocs/**/*.md'
  };

  return import.meta.glob('@mdfiles' + paths[pattern], {
    as: 'raw',
    eager: true,
  });
}
