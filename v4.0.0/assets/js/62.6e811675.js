(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{623:function(l,c,a){"use strict";a.r(c);var d=a(0),G=Object(d.a)({},(function(){var l=this,c=l.$createElement,a=l._self._c||c;return a("ContentSlotsDistributor",{attrs:{"slot-key":l.$parent.slotKey}},[a("h1",{attrs:{id:"integration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#integration"}},[l._v("#")]),l._v(" Integration")]),l._v(" "),a("p",{attrs:{synopsis:""}},[l._v("Learn how to integrate Interchain Accounts host and controller functionality to your chain. The following document only applies for Cosmos SDK chains.")]),l._v(" "),a("p",[l._v("The Interchain Accounts module contains two submodules. Each submodule has its own IBC application. The Interchain Accounts module should be registered as an "),a("code",[l._v("AppModule")]),l._v(" in the same way all SDK modules are registered on a chain, but each submodule should create its own "),a("code",[l._v("IBCModule")]),l._v(" as necessary. A route should be added to the IBC router for each submodule which will be used.")]),l._v(" "),a("p",[l._v("Chains who wish to support ICS27 may elect to act as a host chain, a controller chain or both. Disabling host or controller functionality may be done statically by excluding the host or controller module entirely from the "),a("code",[l._v("app.go")]),l._v(" file or it may be done dynamically by taking advantage of the on-chain parameters which enable or disable the host or controller submodules.")]),l._v(" "),a("p",[l._v("Interchain Account authentication modules are the base application of a middleware stack. The controller submodule is the middleware in this stack.")]),l._v(" "),a("h3",{attrs:{id:"example-integration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-integration"}},[l._v("#")]),l._v(" Example integration")]),l._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gYXBwLmdvCgovLyBSZWdpc3RlciB0aGUgQXBwTW9kdWxlIGZvciB0aGUgSW50ZXJjaGFpbiBBY2NvdW50cyBtb2R1bGUgYW5kIHRoZSBhdXRoZW50aWNhdGlvbiBtb2R1bGUKLy8gTm90ZTogTm8gYGljYWF1dGhgIGV4aXN0cywgdGhpcyBtdXN0IGJlIHN1YnN0aXR1dGVkIHdpdGggYW4gYWN0dWFsIEludGVyY2hhaW4gQWNjb3VudHMgYXV0aGVudGljYXRpb24gbW9kdWxlCk1vZHVsZUJhc2ljcyA9IG1vZHVsZS5OZXdCYXNpY01hbmFnZXIoCiAgICAuLi4KICAgIGljYS5BcHBNb2R1bGVCYXNpY3t9LAogICAgaWNhYXV0aC5BcHBNb2R1bGVCYXNpY3t9LAogICAgLi4uCikKCi4uLiAKCi8vIEFkZCBtb2R1bGUgYWNjb3VudCBwZXJtaXNzaW9ucyBmb3IgdGhlIEludGVyY2hhaW4gQWNjb3VudHMgbW9kdWxlCi8vIE9ubHkgbmVjZXNzYXJ5IGZvciBob3N0IGNoYWluIGZ1bmN0aW9uYWxpdHkKLy8gRWFjaCBJbnRlcmNoYWluIEFjY291bnQgY3JlYXRlZCBvbiB0aGUgaG9zdCBjaGFpbiBpcyBkZXJpdmVkIGZyb20gdGhlIG1vZHVsZSBhY2NvdW50IGNyZWF0ZWQKbWFjY1Blcm1zID0gbWFwW3N0cmluZ11bXXN0cmluZ3sKICAgIC4uLgogICAgaWNhdHlwZXMuTW9kdWxlTmFtZTogICAgICAgICAgICBuaWwsCn0KCi4uLgoKLy8gQWRkIEludGVyY2hhaW4gQWNjb3VudHMgS2VlcGVycyBmb3IgZWFjaCBzdWJtb2R1bGUgdXNlZCBhbmQgdGhlIGF1dGhlbnRpY2F0aW9uIG1vZHVsZQovLyBJZiBhIHN1Ym1vZHVsZSBpcyBiZWluZyBzdGF0aWNhbGx5IGRpc2FibGVkLCB0aGUgYXNzb2NpYXRlZCBLZWVwZXIgZG9lcyBub3QgbmVlZCB0byBiZSBhZGRlZC4gCnR5cGUgQXBwIHN0cnVjdCB7CiAgICAuLi4KCiAgICBJQ0FDb250cm9sbGVyS2VlcGVyIGljYWNvbnRyb2xsZXJrZWVwZXIuS2VlcGVyCiAgICBJQ0FIb3N0S2VlcGVyICAgICAgIGljYWhvc3RrZWVwZXIuS2VlcGVyCiAgICBJQ0FBdXRoS2VlcGVyICAgICAgIGljYWF1dGhrZWVwZXIuS2VlcGVyCgogICAgLi4uCn0KCi4uLgoKLy8gQ3JlYXRlIHN0b3JlIGtleXMgZm9yIGVhY2ggc3VibW9kdWxlIEtlZXBlciBhbmQgdGhlIGF1dGhlbnRpY2F0aW9uIG1vZHVsZQprZXlzIDo9IHNkay5OZXdLVlN0b3JlS2V5cygKICAgIC4uLgogICAgaWNhY29udHJvbGxlcnR5cGVzLlN0b3JlS2V5LAogICAgaWNhaG9zdHR5cGVzLlN0b3JlS2V5LAogICAgaWNhYXV0aHR5cGVzLlN0b3JlS2V5LAogICAgLi4uCikKCi4uLiAKCi8vIENyZWF0ZSB0aGUgc2NvcGVkIGtlZXBlcnMgZm9yIGVhY2ggc3VibW9kdWxlIGtlZXBlciBhbmQgYXV0aGVudGljYXRpb24ga2VlcGVyCnNjb3BlZElDQUNvbnRyb2xsZXJLZWVwZXIgOj0gYXBwLkNhcGFiaWxpdHlLZWVwZXIuU2NvcGVUb01vZHVsZShpY2Fjb250cm9sbGVydHlwZXMuU3ViTW9kdWxlTmFtZSkKc2NvcGVkSUNBSG9zdEtlZXBlciA6PSBhcHAuQ2FwYWJpbGl0eUtlZXBlci5TY29wZVRvTW9kdWxlKGljYWhvc3R0eXBlcy5TdWJNb2R1bGVOYW1lKQpzY29wZWRJQ0FBdXRoS2VlcGVyIDo9IGFwcC5DYXBhYmlsaXR5S2VlcGVyLlNjb3BlVG9Nb2R1bGUoaWNhYXV0aHR5cGVzLk1vZHVsZU5hbWUpCgouLi4KCi8vIENyZWF0ZSB0aGUgS2VlcGVyIGZvciBlYWNoIHN1Ym1vZHVsZQphcHAuSUNBQ29udHJvbGxlcktlZXBlciA9IGljYWNvbnRyb2xsZXJrZWVwZXIuTmV3S2VlcGVyKAoJCWFwcENvZGVjLCBrZXlzW2ljYWNvbnRyb2xsZXJ0eXBlcy5TdG9yZUtleV0sIGFwcC5HZXRTdWJzcGFjZShpY2Fjb250cm9sbGVydHlwZXMuU3ViTW9kdWxlTmFtZSksCgkJYXBwLklCQ0tlZXBlci5DaGFubmVsS2VlcGVyLCAvLyBtYXkgYmUgcmVwbGFjZWQgd2l0aCBtaWRkbGV3YXJlIHN1Y2ggYXMgaWNzMjkgZmVlCgkJYXBwLklCQ0tlZXBlci5DaGFubmVsS2VlcGVyLCAmYW1wO2FwcC5JQkNLZWVwZXIuUG9ydEtlZXBlciwKCQlhcHAuQWNjb3VudEtlZXBlciwgc2NvcGVkSUNBQ29udHJvbGxlcktlZXBlciwgYXBwLk1zZ1NlcnZpY2VSb3V0ZXIoKSwKKQphcHAuSUNBSG9zdEtlZXBlciA9IGljYWhvc3RrZWVwZXIuTmV3S2VlcGVyKAoJCWFwcENvZGVjLCBrZXlzW2ljYWhvc3R0eXBlcy5TdG9yZUtleV0sIGFwcC5HZXRTdWJzcGFjZShpY2Fob3N0dHlwZXMuU3ViTW9kdWxlTmFtZSksCgkJYXBwLklCQ0tlZXBlci5DaGFubmVsS2VlcGVyLCAmYW1wO2FwcC5JQkNLZWVwZXIuUG9ydEtlZXBlciwKCQlhcHAuQWNjb3VudEtlZXBlciwgc2NvcGVkSUNBSG9zdEtlZXBlciwgYXBwLk1zZ1NlcnZpY2VSb3V0ZXIoKSwKKQoKLy8gQ3JlYXRlIEludGVyY2hhaW4gQWNjb3VudHMgQXBwTW9kdWxlCmljYU1vZHVsZSA6PSBpY2EuTmV3QXBwTW9kdWxlKCZhbXA7YXBwLklDQUNvbnRyb2xsZXJLZWVwZXIsICZhbXA7YXBwLklDQUhvc3RLZWVwZXIpCgovLyBDcmVhdGUgeW91ciBJbnRlcmNoYWluIEFjY291bnRzIGF1dGhlbnRpY2F0aW9uIG1vZHVsZQphcHAuSUNBQXV0aEtlZXBlciA9IGljYWF1dGhrZWVwZXIuTmV3S2VlcGVyKGFwcENvZGVjLCBrZXlzW2ljYWF1dGh0eXBlcy5TdG9yZUtleV0sIGFwcC5JQ0FDb250cm9sbGVyS2VlcGVyLCBzY29wZWRJQ0FBdXRoS2VlcGVyKQoKLy8gSUNBIGF1dGggQXBwTW9kdWxlCmljYUF1dGhNb2R1bGUgOj0gaWNhYXV0aC5OZXdBcHBNb2R1bGUoYXBwQ29kZWMsIGFwcC5JQ0FBdXRoS2VlcGVyKQoKLy8gSUNBIGF1dGggSUJDIE1vZHVsZQppY2FBdXRoSUJDTW9kdWxlIDo9IGljYWF1dGguTmV3SUJDTW9kdWxlKGFwcC5JQ0FBdXRoS2VlcGVyKQoKLy8gQ3JlYXRlIGhvc3QgYW5kIGNvbnRyb2xsZXIgSUJDIE1vZHVsZXMgYXMgZGVzaXJlZAppY2FDb250cm9sbGVySUJDTW9kdWxlIDo9IGljYWNvbnRyb2xsZXIuTmV3SUJDTW9kdWxlKGFwcC5JQ0FDb250cm9sbGVyS2VlcGVyLCBpY2FBdXRoSUJDTW9kdWxlKQppY2FIb3N0SUJDTW9kdWxlIDo9IGljYWhvc3QuTmV3SUJDTW9kdWxlKGFwcC5JQ0FIb3N0S2VlcGVyKQoKLy8gUmVnaXN0ZXIgaG9zdCBhbmQgYXV0aGVudGljYXRpb24gcm91dGVzCmliY1JvdXRlci5BZGRSb3V0ZShpY2Fjb250cm9sbGVydHlwZXMuU3ViTW9kdWxlTmFtZSwgaWNhQ29udHJvbGxlcklCQ01vZHVsZSkuCgkJQWRkUm91dGUoaWNhaG9zdHR5cGVzLlN1Yk1vZHVsZU5hbWUsIGljYUhvc3RJQkNNb2R1bGUpLgoJCUFkZFJvdXRlKGljYWF1dGh0eXBlcy5Nb2R1bGVOYW1lLCBpY2FDb250cm9sbGVySUJDTW9kdWxlKSAvLyBOb3RlLCB0aGUgYXV0aGVudGljYXRpb24gbW9kdWxlIGlzIHJvdXRlZCB0byB0aGUgdG9wIGxldmVsIG9mIHRoZSBtaWRkbGV3YXJlIHN0YWNrCgouLi4KCi8vIFJlZ2lzdGVyIEludGVyY2hhaW4gQWNjb3VudHMgYW5kIGF1dGhlbnRpY2F0aW9uIG1vZHVsZSBBcHBNb2R1bGUncwphcHAubW9kdWxlTWFuYWdlciA9IG1vZHVsZS5OZXdNYW5hZ2VyKAogICAgLi4uCiAgICBpY2FNb2R1bGUsCiAgICBpY2FBdXRoTW9kdWxlLAopCgouLi4KCi8vIEFkZCBJbnRlcmNoYWluIEFjY291bnRzIG1vZHVsZSBJbml0R2VuZXNpcyBsb2dpYwphcHAubW0uU2V0T3JkZXJJbml0R2VuZXNpcygKICAgIC4uLgogICAgaWNhdHlwZXMuTW9kdWxlTmFtZSwKICAgIC4uLgopCg=="}}),l._v(" "),a("h3",{attrs:{id:"using-submodules-exclusively"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#using-submodules-exclusively"}},[l._v("#")]),l._v(" Using submodules exclusively")]),l._v(" "),a("p",[l._v("As described above, the Interchain Accounts application module is structured to support the ability of exclusively enabling controller or host functionality.\nThis can be achieved by simply omitting either controller or host "),a("code",[l._v("Keeper")]),l._v(" from the Interchain Accounts "),a("code",[l._v("NewAppModule")]),l._v(" constructor function, and mounting only the desired submodule via the "),a("code",[l._v("IBCRouter")]),l._v(".\nAlternatively, submodules can be enabled and disabled dynamically using "),a("RouterLink",{attrs:{to:"/apps/interchain-accounts/parameters.html"}},[l._v("on-chain parameters")]),l._v(".")],1),l._v(" "),a("p",[l._v("The following snippets show basic examples of statically disabling submodules using "),a("code",[l._v("app.go")]),l._v(".")]),l._v(" "),a("h4",{attrs:{id:"disabling-controller-chain-functionality"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#disabling-controller-chain-functionality"}},[l._v("#")]),l._v(" Disabling controller chain functionality")]),l._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gQ3JlYXRlIEludGVyY2hhaW4gQWNjb3VudHMgQXBwTW9kdWxlIG9taXR0aW5nIHRoZSBjb250cm9sbGVyIGtlZXBlcgppY2FNb2R1bGUgOj0gaWNhLk5ld0FwcE1vZHVsZShuaWwsICZhbXA7YXBwLklDQUhvc3RLZWVwZXIpCgovLyBDcmVhdGUgaG9zdCBJQkMgTW9kdWxlCmljYUhvc3RJQkNNb2R1bGUgOj0gaWNhaG9zdC5OZXdJQkNNb2R1bGUoYXBwLklDQUhvc3RLZWVwZXIpCgovLyBSZWdpc3RlciBob3N0IHJvdXRlCmliY1JvdXRlci5BZGRSb3V0ZShpY2Fob3N0dHlwZXMuU3ViTW9kdWxlTmFtZSwgaWNhSG9zdElCQ01vZHVsZSkK"}}),l._v(" "),a("h4",{attrs:{id:"disabling-host-chain-functionality"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#disabling-host-chain-functionality"}},[l._v("#")]),l._v(" Disabling host chain functionality")]),l._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gQ3JlYXRlIEludGVyY2hhaW4gQWNjb3VudHMgQXBwTW9kdWxlIG9taXR0aW5nIHRoZSBob3N0IGtlZXBlcgppY2FNb2R1bGUgOj0gaWNhLk5ld0FwcE1vZHVsZSgmYW1wO2FwcC5JQ0FDb250cm9sbGVyS2VlcGVyLCBuaWwpCgovLyBDcmVhdGUgeW91ciBJbnRlcmNoYWluIEFjY291bnRzIGF1dGhlbnRpY2F0aW9uIG1vZHVsZSwgc2V0dGluZyB1cCB0aGUgS2VlcGVyLCBBcHBNb2R1bGUgYW5kIElCQ01vZHVsZSBhcHByb3ByaWF0ZWx5CmFwcC5JQ0FBdXRoS2VlcGVyID0gaWNhYXV0aGtlZXBlci5OZXdLZWVwZXIoYXBwQ29kZWMsIGtleXNbaWNhYXV0aHR5cGVzLlN0b3JlS2V5XSwgYXBwLklDQUNvbnRyb2xsZXJLZWVwZXIsIHNjb3BlZElDQUF1dGhLZWVwZXIpCmljYUF1dGhNb2R1bGUgOj0gaWNhYXV0aC5OZXdBcHBNb2R1bGUoYXBwQ29kZWMsIGFwcC5JQ0FBdXRoS2VlcGVyKQppY2FBdXRoSUJDTW9kdWxlIDo9IGljYWF1dGguTmV3SUJDTW9kdWxlKGFwcC5JQ0FBdXRoS2VlcGVyKQoKLy8gQ3JlYXRlIGNvbnRyb2xsZXIgSUJDIE1vZHVsZQppY2FDb250cm9sbGVySUJDTW9kdWxlIDo9IGljYWNvbnRyb2xsZXIuTmV3SUJDTW9kdWxlKGFwcC5JQ0FDb250cm9sbGVyS2VlcGVyLCBpY2FBdXRoSUJDTW9kdWxlKQoKLy8gUmVnaXN0ZXIgY29udHJvbGxlciBhbmQgYXV0aGVudGljYXRpb24gcm91dGVzCmliY1JvdXRlci5BZGRSb3V0ZShpY2Fjb250cm9sbGVydHlwZXMuU3ViTW9kdWxlTmFtZSwgaWNhQ29udHJvbGxlcklCQ01vZHVsZSkKaWJjUm91dGVyLkFkZFJvdXRlKGljYWF1dGh0eXBlcy5Nb2R1bGVOYW1lLCBpY2FDb250cm9sbGVySUJDTW9kdWxlKSAvLyBOb3RlLCB0aGUgYXV0aGVudGljYXRpb24gbW9kdWxlIGlzIHJvdXRlZCB0byB0aGUgdG9wIGxldmVsIG9mIHRoZSBtaWRkbGV3YXJlIHN0YWNrCg=="}})],1)}),[],!1,null,null,null);c.default=G.exports}}]);