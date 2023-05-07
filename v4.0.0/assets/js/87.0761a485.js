(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{647:function(l,c,d){"use strict";d.r(c);var t=d(0),a=Object(t.a)({},(function(){var l=this,c=l.$createElement,d=l._self._c||c;return d("ContentSlotsDistributor",{attrs:{"slot-key":l.$parent.slotKey}},[d("h1",{attrs:{id:"integrating-ibc-middleware-into-a-chain"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#integrating-ibc-middleware-into-a-chain"}},[l._v("#")]),l._v(" Integrating IBC Middleware into a Chain")]),l._v(" "),d("p",[l._v("Learn how to integrate IBC middleware(s) with a base application to your chain. The following document only applies for Cosmos SDK chains.")]),l._v(" "),d("p",[l._v("If the middleware is maintaining its own state and/or processing SDK messages, then it should create and register its SDK module "),d("strong",[l._v("only once")]),l._v(" with the module manager in "),d("code",[l._v("app.go")]),l._v(".")]),l._v(" "),d("p",[l._v("All middleware must be connected to the IBC router and wrap over an underlying base IBC application. An IBC application may be wrapped by many layers of middleware, only the top layer middleware should be hooked to the IBC router, with all underlying middlewares and application getting wrapped by it.")]),l._v(" "),d("p",[l._v("The order of middleware "),d("strong",[l._v("matters")]),l._v(", function calls from IBC to the application travel from top-level middleware to the bottom middleware and then to the application. Function calls from the application to IBC goes through the bottom middleware in order to the top middleware and then to core IBC handlers. Thus the same set of middleware put in different orders may produce different effects.")]),l._v(" "),d("h3",{attrs:{id:"example-integration"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#example-integration"}},[l._v("#")]),l._v(" Example integration")]),l._v(" "),d("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gYXBwLmdvCgovLyBtaWRkbGV3YXJlIDEgYW5kIG1pZGRsZXdhcmUgMyBhcmUgc3RhdGVmdWwgbWlkZGxld2FyZSwgCi8vIHBlcmhhcHMgaW1wbGVtZW50aW5nIHNlcGFyYXRlIHNkay5Nc2cgYW5kIEhhbmRsZXJzCm13MUtlZXBlciA6PSBtdzEuTmV3S2VlcGVyKHN0b3JlS2V5MSkKbXczS2VlcGVyIDo9IG13My5OZXdLZWVwZXIoc3RvcmVLZXkzKQoKLy8gT25seSBjcmVhdGUgQXBwIE1vZHVsZSAqKm9uY2UqKiBhbmQgcmVnaXN0ZXIgaW4gYXBwIG1vZHVsZQovLyBpZiB0aGUgbW9kdWxlIG1haW50YWlucyBpbmRlcGVuZGVudCBzdGF0ZSBhbmQvb3IgcHJvY2Vzc2VzIHNkay5Nc2dzCmFwcC5tb2R1bGVNYW5hZ2VyID0gbW9kdWxlLk5ld01hbmFnZXIoCiAgICAuLi4KICAgIG13MS5OZXdBcHBNb2R1bGUobXcxS2VlcGVyKSwKICAgIG13My5OZXdBcHBNb2R1bGUobXczS2VlcGVyKSwKICAgIHRyYW5zZmVyLk5ld0FwcE1vZHVsZSh0cmFuc2ZlcktlZXBlciksCiAgICBjdXN0b20uTmV3QXBwTW9kdWxlKGN1c3RvbUtlZXBlcikKKQoKbXcxSUJDTW9kdWxlIDo9IG13MS5OZXdJQkNNb2R1bGUobXcxS2VlcGVyKQptdzJJQkNNb2R1bGUgOj0gbXcyLk5ld0lCQ01vZHVsZSgpIC8vIG1pZGRsZXdhcmUyIGlzIHN0YXRlbGVzcyBtaWRkbGV3YXJlCm13M0lCQ01vZHVsZSA6PSBtdzMuTmV3SUJDTW9kdWxlKG13M0tlZXBlcikKCnNjb3BlZEtlZXBlclRyYW5zZmVyIDo9IGNhcGFiaWxpdHlLZWVwZXIuTmV3U2NvcGVkS2VlcGVyKCZxdW90O3RyYW5zZmVyJnF1b3Q7KQpzY29wZWRLZWVwZXJDdXN0b20xIDo9IGNhcGFiaWxpdHlLZWVwZXIuTmV3U2NvcGVkS2VlcGVyKCZxdW90O2N1c3RvbTEmcXVvdDspCnNjb3BlZEtlZXBlckN1c3RvbTIgOj0gY2FwYWJpbGl0eUtlZXBlci5OZXdTY29wZWRLZWVwZXIoJnF1b3Q7Y3VzdG9tMiZxdW90OykKCi8vIE5PVEU6IElCQyBNb2R1bGVzIG1heSBiZSBpbml0aWFsaXplZCBhbnkgbnVtYmVyIG9mIHRpbWVzIHByb3ZpZGVkIHRoZXkgdXNlIGEgc2VwYXJhdGUKLy8gc2NvcGVkS2VlcGVyIGFuZCB1bmRlcmx5aW5nIHBvcnQuCgovLyBpbml0aWFsaXplIGJhc2UgSUJDIGFwcGxpY2F0aW9ucwovLyBpZiB5b3Ugd2FudCB0byBjcmVhdGUgdHdvIGRpZmZlcmVudCBzdGFja3Mgd2l0aCB0aGUgc2FtZSBiYXNlIGFwcGxpY2F0aW9uLAovLyB0aGV5IG11c3QgYmUgZ2l2ZW4gZGlmZmVyZW50IHNjb3BlZEtlZXBlcnMgYW5kIGFzc2lnbmVkIGRpZmZlcmVudCBwb3J0cy4KdHJhbnNmZXJJQkNNb2R1bGUgOj0gdHJhbnNmZXIuTmV3SUJDTW9kdWxlKHRyYW5zZmVyS2VlcGVyLCBzY29wZWRLZWVwZXJUcmFuc2ZlcikKY3VzdG9tSUJDTW9kdWxlMSA6PSBjdXN0b20uTmV3SUJDTW9kdWxlKGN1c3RvbUtlZXBlciwgc2NvcGVkS2VlcGVyQ3VzdG9tMSwgJnF1b3Q7cG9ydEN1c3RvbTEmcXVvdDspCmN1c3RvbUlCQ01vZHVsZTIgOj0gY3VzdG9tLk5ld0lCQ01vZHVsZShjdXN0b21LZWVwZXIsIHNjb3BlZEtlZXBlckN1c3RvbTIsICZxdW90O3BvcnRDdXN0b20yJnF1b3Q7KQoKLy8gY3JlYXRlIElCQyBzdGFja3MgYnkgY29tYmluaW5nIG1pZGRsZXdhcmUgd2l0aCBiYXNlIGFwcGxpY2F0aW9uCi8vIE5PVEU6IHNpbmNlIG1pZGRsZXdhcmUyIGlzIHN0YXRlbGVzcyBpdCBkb2VzIG5vdCByZXF1aXJlIGEgS2VlcGVyCi8vIHN0YWNrIDEgY29udGFpbnMgbXcxIC0mZ3Q7IG13MyAtJmd0OyB0cmFuc2ZlcgpzdGFjazEgOj0gbXcxLk5ld0lCQ01vZHVsZShtdzFLZWVwZXIsIG13My5OZXdJQkNNb2R1bGUobXczS2VlcGVyLCB0cmFuc2ZlcklCQ01vZHVsZSkpCi8vIHN0YWNrIDIgY29udGFpbnMgbXczIC0mZ3Q7IG13MiAtJmd0OyBjdXN0b20xCnN0YWNrMiA6PSBtdzMuTmV3SUJDTW9kdWxlKG13M0tlZXBlciwgbXczLk5ld0lCQ01vZHVsZShjdXN0b21JQkNNb2R1bGUxKSkKLy8gc3RhY2sgMyBjb250YWlucyBtdzIgLSZndDsgbXcxIC0mZ3Q7IGN1c3RvbTIKc3RhY2szIDo9IG13Mi5OZXdJQkNNb2R1bGUobXcxLk5ld0lCQ01vZHVsZShtdzFLZWVwZXIsIGN1c3RvbUlCQ01vZHVsZTIpKQoKLy8gYXNzb2NpYXRlIGVhY2ggc3RhY2sgd2l0aCB0aGUgbW9kdWxlTmFtZSBwcm92aWRlZCBieSB0aGUgdW5kZXJseWluZyBzY29wZWRLZWVwZXIKaWJjUm91dGVyIDo9IHBvcnR0eXBlcy5OZXdSb3V0ZXIoKQppYmNSb3V0ZXIuQWRkUm91dGUoJnF1b3Q7dHJhbnNmZXImcXVvdDssIHN0YWNrMSkKaWJjUm91dGVyLkFkZFJvdXRlKCZxdW90O2N1c3RvbTEmcXVvdDssIHN0YWNrMikKaWJjUm91dGVyLkFkZFJvdXRlKCZxdW90O2N1c3RvbTImcXVvdDssIHN0YWNrMykKYXBwLklCQ0tlZXBlci5TZXRSb3V0ZXIoaWJjUm91dGVyKQo="}})],1)}),[],!1,null,null,null);c.default=a.exports}}]);