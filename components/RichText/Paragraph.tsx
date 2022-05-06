import type { PropsWithChildren } from 'react';

function Paragraph({ children }: PropsWithChildren<{}>) {
    return <p className="mb-3">{children}</p>;
}

export default Paragraph;
