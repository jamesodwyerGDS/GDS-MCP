import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import SourceCard from './SourceCard';

function MessageList({ messages }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {messages.map((message, idx) => (
        <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`w-full ${message.role === 'user' ? 'max-w-2xl ml-auto' : 'max-w-3xl'}`}>
            {/* Message Bubble */}
            <div className={`rounded-lg ${
              message.role === 'user'
                ? 'bg-neptune text-white p-4'
                : message.role === 'error'
                ? 'bg-red-50 border border-red-200 text-red-900 p-4'
                : 'bg-white border border-gray-200 p-5'
            }`}>
              {message.role === 'assistant' ? (
                <div className="prose prose-base max-w-none
                  prose-headings:font-bold prose-headings:text-cosmos prose-headings:tracking-tight
                  prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:first:mt-0 prose-h1:leading-tight
                  prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:first:mt-0 prose-h2:leading-tight prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                  prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:leading-snug
                  prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4
                  prose-p:text-granite prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-p:last:mb-0
                  prose-a:text-neptune prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:transition-colors
                  prose-strong:text-cosmos prose-strong:font-bold
                  prose-em:text-granite prose-em:italic
                  prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:border prose-code:border-gray-300 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-5
                  prose-pre:border prose-pre:border-gray-700 prose-pre:shadow-lg
                  prose-ul:list-disc prose-ul:ml-6 prose-ul:my-4 prose-ul:text-granite prose-ul:space-y-2
                  prose-ol:list-decimal prose-ol:ml-6 prose-ol:my-4 prose-ol:text-granite prose-ol:space-y-2
                  prose-li:text-base prose-li:leading-relaxed prose-li:text-granite
                  prose-blockquote:border-l-4 prose-blockquote:border-neptune prose-blockquote:bg-blue-50 prose-blockquote:pl-4 prose-blockquote:pr-4 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-granite prose-blockquote:my-5 prose-blockquote:rounded-r
                  prose-hr:border-gray-300 prose-hr:my-8
                  prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
                ">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      // Headings with proper styling
                      h1({children, ...props}) {
                        return (
                          <h1 className="text-3xl font-bold text-cosmos mb-6 mt-8 first:mt-0 leading-tight tracking-tight" {...props}>
                            {children}
                          </h1>
                        );
                      },
                      h2({children, ...props}) {
                        return (
                          <h2 className="text-2xl font-bold text-cosmos mb-4 mt-8 first:mt-0 leading-tight tracking-tight border-b border-gray-200 pb-2" {...props}>
                            {children}
                          </h2>
                        );
                      },
                      h3({children, ...props}) {
                        return (
                          <h3 className="text-xl font-bold text-cosmos mb-3 mt-6 leading-snug tracking-tight" {...props}>
                            {children}
                          </h3>
                        );
                      },
                      h4({children, ...props}) {
                        return (
                          <h4 className="text-lg font-bold text-cosmos mb-2 mt-4" {...props}>
                            {children}
                          </h4>
                        );
                      },
                      // Paragraphs with proper spacing
                      p({children, ...props}) {
                        return (
                          <p className="text-base text-granite leading-relaxed mb-4 last:mb-0" {...props}>
                            {children}
                          </p>
                        );
                      },
                      // Lists with proper spacing
                      ul({children, ...props}) {
                        return (
                          <ul className="list-disc ml-6 my-4 space-y-2 text-granite" {...props}>
                            {children}
                          </ul>
                        );
                      },
                      ol({children, ...props}) {
                        return (
                          <ol className="list-decimal ml-6 my-4 space-y-2 text-granite" {...props}>
                            {children}
                          </ol>
                        );
                      },
                      li({children, ...props}) {
                        return (
                          <li className="text-base leading-relaxed text-granite" {...props}>
                            {children}
                          </li>
                        );
                      },
                      // Links
                      a({children, href, ...props}) {
                        return (
                          <a href={href} className="text-neptune font-medium hover:underline transition-colors" {...props}>
                            {children}
                          </a>
                        );
                      },
                      // Strong and emphasis
                      strong({children, ...props}) {
                        return (
                          <strong className="font-bold text-cosmos" {...props}>
                            {children}
                          </strong>
                        );
                      },
                      em({children, ...props}) {
                        return (
                          <em className="italic text-granite" {...props}>
                            {children}
                          </em>
                        );
                      },
                      // Blockquotes
                      blockquote({children, ...props}) {
                        return (
                          <blockquote className="border-l-4 border-neptune bg-blue-50 pl-4 pr-4 py-3 italic text-granite my-5 rounded-r" {...props}>
                            {children}
                          </blockquote>
                        );
                      },
                      // Horizontal rule
                      hr({...props}) {
                        return <hr className="border-gray-300 my-8" {...props} />;
                      },
                      // Custom code block rendering
                      code({node, inline, className, children, ...props}) {
                        if (inline) {
                          return (
                            <code
                              style={{
                                backgroundColor: '#f3f4f6',
                                color: '#1f2937',
                                border: '1px solid #d1d5db',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '0.875rem',
                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                fontWeight: '400'
                              }}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        }
                        const language = className?.replace('language-', '') || 'text';
                        return (
                          <div className="relative my-5">
                            <div className="absolute top-2 right-2 text-xs text-gray-400 uppercase font-mono">{language}</div>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto border border-gray-700 shadow-lg">
                              <code className={className} {...props}>{children}</code>
                            </pre>
                          </div>
                        );
                      },
                      // Better table rendering with explicit styling
                      table({children, ...props}) {
                        return (
                          <div className="overflow-x-auto my-6">
                            <table className="min-w-full divide-y divide-gray-300 border border-gray-300" {...props}>
                              {children}
                            </table>
                          </div>
                        );
                      },
                      thead({children, ...props}) {
                        return (
                          <thead className="bg-gray-50" {...props}>
                            {children}
                          </thead>
                        );
                      },
                      tbody({children, ...props}) {
                        return (
                          <tbody className="divide-y divide-gray-200 bg-white" {...props}>
                            {children}
                          </tbody>
                        );
                      },
                      tr({children, ...props}) {
                        return (
                          <tr {...props}>
                            {children}
                          </tr>
                        );
                      },
                      th({children, ...props}) {
                        return (
                          <th className="px-4 py-3 text-left text-sm font-semibold text-cosmos border border-gray-300 bg-gray-50" {...props}>
                            {children}
                          </th>
                        );
                      },
                      td({children, ...props}) {
                        return (
                          <td className="px-4 py-3 text-sm text-granite border border-gray-300 whitespace-normal" {...props}>
                            {children}
                          </td>
                        );
                      },
                      // Custom spacing token visualization
                      div({children, ...props}) {
                        // Check if this is a spacing token visualization div
                        if (props['data-spacing-token'] && props['data-spacing-value']) {
                          const tokenName = props['data-spacing-token'];
                          const tokenValue = props['data-spacing-value'];
                          const pixelValue = parseInt(tokenValue);

                          return (
                            <div className="inline-flex items-center justify-center gap-2 my-1">
                              <div
                                className="bg-gray-100 text-cosmos flex items-center justify-center text-xs font-mono font-medium rounded border border-gray-300"
                                style={{
                                  width: `${pixelValue}px`,
                                  height: `${pixelValue}px`,
                                  minWidth: '32px',
                                  minHeight: '32px'
                                }}
                                title={`${tokenName}: ${tokenValue}`}
                              >
                                <span className="transform -rotate-0">{tokenValue}</span>
                              </div>
                            </div>
                          );
                        }

                        // Regular div rendering
                        return <div {...props}>{children}</div>;
                      }
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              )}
            </div>

            {/* Sources */}
            {message.sources && message.sources.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-xs text-granite font-semibold uppercase tracking-wide">Sources</p>
                <div className="space-y-2">
                  {message.sources.map((source, i) => (
                    <SourceCard key={i} source={source} />
                  ))}
                </div>
              </div>
            )}

            {/* Timestamp */}
            <p className="text-xs text-slate mt-2 opacity-70">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
