// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App

import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import 'highlight.js/styles/github-dark.css';
import './App.css';

function App() {
  const inputRef = useRef('');

  const sample = [
    {
      role: 'user',
      text: 'Which continent is Ghana in?',
      timestamp: '2026-10-15T08:43:49.549Z',
    },
    {
      role: 'assistant',
      text: 'Ghana is located in **Africa** (specifically, West Africa).',
      timestamp: '2026-10-15T08:43:49.549Z',
    },
  ];

  const [messages, setMessages] = useState(sample ?? []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputValue = inputRef.current.value;
    console.log('User typed:', inputValue);

    try {
      const response = await fetch('http://127.0.0.1:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify(messages),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response) {
        console.log('Error!');
        return;
      }

      const data = await response.json();
      console.log('Response data:', data);

      inputRef.current.value = '';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <aside className="sidebar">
        <div style={{ padding: '1rem' }}>
          <h2>Logo</h2>
        </div>
        <div style={{ padding: '1rem' }}>
          <button
            onClick={() => {
              console.log('Hello world!');
            }}
            style={{ padding: '16px' }}
          >
            New chat
          </button>
        </div>
      </aside> */}
      <section className="chat">
        {messages.length === 0 && (
          <div className="headline-wrapper">
            <p className="headline">Welcome to Kivo AI</p>
          </div>
        )}

        {messages.map((message) => {
          if (message.role === 'user')
            return (
              <div
                style={{
                  backgroundColor: 'blue',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '50px',
                  alignSelf: 'flex-end',
                }}
              >
                <p>{message.text}</p>
              </div>
            );

          if (message.role === 'assistant')
            return (
              <div
                style={{
                  alignSelf: 'flex-start',
                }}
                className="markdown-body"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {bar}
                  {/* {message.content} */}
                </ReactMarkdown>
              </div>
            );
        })}
        {/* 
        {bar && (
          <div className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {bar}
    
            </ReactMarkdown>
          </div>
        )} */}

        <form className="input-wrapper" onSubmit={handleSubmit}>
          <input
            type="text"
            id="chat"
            className="input"
            placeholder="Ask KivoAI"
            ref={inputRef}
          />
          <button className="btn-send" type="submit">
            <span className="material-symbols-outlined btn-icon">
              arrow_upward
            </span>
          </button>
        </form>
      </section>
    </>
  );
}

export default App;
