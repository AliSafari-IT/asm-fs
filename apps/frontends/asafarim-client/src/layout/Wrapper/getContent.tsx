import { Stack } from "@fluentui/react";

function getContent(selectedLink: { id: number; title: string; content: string; } | undefined) {
    return <Stack.Item className="content-panel" styles={{ root: { flexGrow: 1, minHeight: '100vh' } }}>
        <article className="content">
            {selectedLink && <div dangerouslySetInnerHTML={{ __html: selectedLink.content }} />}
        </article>
    </Stack.Item>;
}

export default getContent;