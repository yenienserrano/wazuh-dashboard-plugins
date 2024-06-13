import React from 'react';
import { EuiFlexItem, EuiCodeBlock, EuiTabbedContent } from '@elastic/eui';
import { IndexPattern } from '../../../../../../../../src/plugins/data/common';
import DocViewer from '../../doc_viewer/doc_viewer';
import { useDocViewer } from '../../doc_viewer/use_doc_viewer';

export const DocumentViewTableAndJson = ({ document, indexPattern }) => {
  const docViewerProps = useDocViewer({
    doc: document,
    indexPattern: indexPattern as IndexPattern,
  });

  return (
    <EuiFlexItem>
      <EuiTabbedContent
        tabs={[
          {
            id: 'table',
            name: 'Table',
            content: <DocViewer {...docViewerProps} />,
          },
          {
            id: 'json',
            name: 'JSON',
            content: (
              <EuiCodeBlock
                aria-label={'Document details'}
                language='json'
                isCopyable
                paddingSize='s'
              >
                {JSON.stringify(document, null, 2)}
              </EuiCodeBlock>
            ),
          },
        ]}
      />
    </EuiFlexItem>
  );
};