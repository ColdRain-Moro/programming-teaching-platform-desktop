import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Code(props: { lang: string, children: string }) {

    return <SyntaxHighlighter showLineNumbers={true}
        startingLineNumber={0}
        language={props.lang}
        style={dark}
        lineNumberStyle={{ color: '#ddd', fontSize: 20 }}
        wrapLines={true}>
        {props.children.replace(/^\s+|\s+$/g, '')}
    </SyntaxHighlighter>
}