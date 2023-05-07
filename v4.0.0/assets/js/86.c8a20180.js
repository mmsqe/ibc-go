(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{646:function(e,a,t){"use strict";t.r(a);var l=t(0),c=Object(l.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"ibc-middleware"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ibc-middleware"}},[e._v("#")]),e._v(" IBC Middleware")]),e._v(" "),t("p",[e._v("Learn how to write your own custom middleware to wrap an IBC application, and understand how to hook different middleware to IBC base applications to form different IBC application stacks {synopsis}.")]),e._v(" "),t("p",[e._v("This document serves as a guide for middleware developers who want to write their own middleware and for chain developers who want to use IBC middleware on their chains.")]),e._v(" "),t("p",[e._v("IBC applications are designed to be self-contained modules that implement their own application-specific logic through a set of interfaces with the core IBC handlers. These core IBC handlers, in turn, are designed to enforce the correctness properties of IBC (transport, authentication, ordering) while delegating all application-specific handling to the IBC application modules. However, there are cases where some functionality may be desired by many applications, yet not appropriate to place in core IBC.")]),e._v(" "),t("p",[e._v("Middleware allows developers to define the extensions as separate modules that can wrap over the base application. This middleware can thus perform its own custom logic, and pass data into the application so that it may run its logic without being aware of the middleware's existence. This allows both the application and the middleware to implement its own isolated logic while still being able to run as part of a single packet flow.")]),e._v(" "),t("h2",{attrs:{id:"pre-requisite-readings"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#pre-requisite-readings"}},[e._v("#")]),e._v(" Pre-requisite Readings")]),e._v(" "),t("ul",[t("li",{attrs:{prereq:""}},[t("RouterLink",{attrs:{to:"/ibc/overview.html"}},[e._v("IBC Overview")])],1),e._v(" "),t("li",{attrs:{prereq:""}},[t("RouterLink",{attrs:{to:"/ibc/integration.html"}},[e._v("IBC Integration")])],1),e._v(" "),t("li",{attrs:{prereq:""}},[t("RouterLink",{attrs:{to:"/ibc/apps.html"}},[e._v("IBC Application Developer Guide")])],1)]),e._v(" "),t("h2",{attrs:{id:"definitions"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#definitions"}},[e._v("#")]),e._v(" Definitions")]),e._v(" "),t("p",[t("code",[e._v("Middleware")]),e._v(": A self-contained module that sits between core IBC and an underlying IBC application during packet execution. All messages between core IBC and underlying application must flow through middleware, which may perform its own custom logic.")]),e._v(" "),t("p",[t("code",[e._v("Underlying Application")]),e._v(": An underlying application is the application that is directly connected to the middleware in question. This underlying application may itself be middleware that is chained to a base application.")]),e._v(" "),t("p",[t("code",[e._v("Base Application")]),e._v(": A base application is an IBC application that does not contain any middleware. It may be nested by 0 or multiple middleware to form an application stack.")]),e._v(" "),t("p",[t("code",[e._v("Application Stack (or stack)")]),e._v(": A stack is the complete set of application logic (middleware(s) +  base application) that gets connected to core IBC. A stack may be just a base application, or it may be a series of middlewares that nest a base application.")]),e._v(" "),t("h2",{attrs:{id:"create-a-custom-ibc-middleware"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#create-a-custom-ibc-middleware"}},[e._v("#")]),e._v(" Create a custom IBC Middleware")]),e._v(" "),t("p",[e._v("IBC Middleware will wrap over an underlying IBC application and sits between core IBC and the application. It has complete control in modifying any message coming from IBC to the application, and any message coming from the application to core IBC. Thus, middleware must be completely trusted by chain developers who wish to integrate them, however this gives them complete flexibility in modifying the application(s) they wrap.")]),e._v(" "),t("h4",{attrs:{id:"interfaces"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#interfaces"}},[e._v("#")]),e._v(" Interfaces")]),e._v(" "),t("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gTWlkZGxld2FyZSBpbXBsZW1lbnRzIHRoZSBJQ1MyNiBNb2R1bGUgaW50ZXJmYWNlCnR5cGUgTWlkZGxld2FyZSBpbnRlcmZhY2UgewogICAgcG9ydHR5cGVzLklCQ01vZHVsZSAvLyBtaWRkbGV3YXJlIGhhcyBhY2NjZXNzIHRvIGFuIHVuZGVybHlpbmcgYXBwbGljYXRpb24gd2hpY2ggbWF5IGJlIHdyYXBwZWQgYnkgbW9yZSBtaWRkbGV3YXJlCiAgICBpY3M0V3JhcHBlcjogSUNTNFdyYXBwZXIgLy8gbWlkZGxld2FyZSBoYXMgYWNjZXNzIHRvIElDUzRXcmFwcGVyIHdoaWNoIG1heSBiZSBjb3JlIElCQyBDaGFubmVsIEhhbmRsZXIgb3IgYSBoaWdoZXItbGV2ZWwgbWlkZGxld2FyZSB0aGF0IHdyYXBzIHRoaXMgbWlkZGxld2FyZS4KfQo="}}),e._v(" "),t("tm-code-block",{staticClass:"codeblock",attrs:{language:"typescript",base64:"Ly8gVGhpcyBpcyBpbXBsZW1lbnRlZCBieSBJQ1M0IGFuZCBhbGwgbWlkZGxld2FyZSB0aGF0IGFyZSB3cmFwcGluZyBiYXNlIGFwcGxpY2F0aW9uLgovLyBUaGUgYmFzZSBhcHBsaWNhdGlvbiB3aWxsIGNhbGwgYHNlbmRQYWNrZXRgIG9yIGB3cml0ZUFja25vd2xlZGdlbWVudGAgb2YgdGhlIG1pZGRsZXdhcmUgZGlyZWN0bHkgYWJvdmUgdGhlbQovLyB3aGljaCB3aWxsIGNhbGwgdGhlIG5leHQgbWlkZGxld2FyZSB1bnRpbCBpdCByZWFjaGVzIHRoZSBjb3JlIElCQyBoYW5kbGVyLgp0eXBlIElDUzRXcmFwcGVyIGludGVyZmFjZSB7CiAgICBTZW5kUGFja2V0KGN0eCBzZGsuQ29udGV4dCwgY2hhbkNhcCAqY2FwYWJpbGl0eXR5cGVzLkNhcGFiaWxpdHksIHBhY2tldCBleHBvcnRlZC5QYWNrZXQpIGVycm9yCiAgICBXcml0ZUFja25vd2xlZGdlbWVudChjdHggc2RrLkNvbnRleHQsIGNoYW5DYXAgKmNhcGFiaWxpdHl0eXBlcy5DYXBhYmlsaXR5LCBwYWNrZXQgZXhwb3J0ZWQuUGFja2V0LCBhY2sgW11ieXRlKSBlcnJvcgogICAgR2V0QXBwVmVyc2lvbihjdHggc2RrLkNvbnRleHQsIHBvcnRJRCwgY2hhbm5lbElEIHN0cmluZykgKHN0cmluZywgYm9vbCkgCn0K"}}),e._v(" "),t("h3",{attrs:{id:"implement-ibcmodule-interface-and-callbacks"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#implement-ibcmodule-interface-and-callbacks"}},[e._v("#")]),e._v(" Implement "),t("code",[e._v("IBCModule")]),e._v(" interface and callbacks")]),e._v(" "),t("p",[e._v("The IBCModule is struct that implements the ICS26Interface ("),t("code",[e._v("porttypes.IBCModule")]),e._v("). It is recommended to separate these callbacks into a separate file "),t("code",[e._v("ibc_module.go")]),e._v(". As will be mentioned in the "),t("RouterLink",{attrs:{to:"/ibc/middleware/integration.html"}},[e._v("integration doc")]),e._v(", this struct should be different than the struct that implements "),t("code",[e._v("AppModule")]),e._v(" in case the middleware maintains its own internal state and processes separate SDK messages.")],1),e._v(" "),t("p",[e._v("The middleware must have access to the underlying application, and be called before during all ICS-26 callbacks. It may execute custom logic during these callbacks, and then call the underlying application's callback. Middleware "),t("strong",[e._v("may")]),e._v(" choose not to call the underlying application's callback at all. Though these should generally be limited to error cases.")]),e._v(" "),t("p",[e._v("In the case where the IBC middleware expects to speak to a compatible IBC middleware on the counterparty chain; they must use the channel handshake to negotiate the middleware version without interfering in the version negotiation of the underlying application.")]),e._v(" "),t("p",[e._v("Middleware accomplishes this by formatting the version in the following format: "),t("code",[e._v("{mw-version}:{app-version}")]),e._v(".")]),e._v(" "),t("p",[e._v("During the handshake callbacks, the middleware can split the version into: "),t("code",[e._v("mw-version")]),e._v(", "),t("code",[e._v("app-version")]),e._v(". It can do its negotiation logic on "),t("code",[e._v("mw-version")]),e._v(", and pass the "),t("code",[e._v("app-version")]),e._v(" to the underlying application.")]),e._v(" "),t("p",[e._v("The middleware should simply pass the capability in the callback arguments along to the underlying application so that it may be claimed by the base application. The base application will then pass the capability up the stack in order to authenticate an outgoing packet/acknowledgement.")]),e._v(" "),t("p",[e._v("In the case where the middleware wishes to send a packet or acknowledgment without the involvement of the underlying application, it should be given access to the same "),t("code",[e._v("scopedKeeper")]),e._v(" as the base application so that it can retrieve the capabilities by itself.")]),e._v(" "),t("h3",{attrs:{id:"handshake-callbacks"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#handshake-callbacks"}},[e._v("#")]),e._v(" Handshake callbacks")]),e._v(" "),t("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyAoaW0gSUJDTW9kdWxlKSBPbkNoYW5PcGVuSW5pdChjdHggc2RrLkNvbnRleHQsCiAgICBvcmRlciBjaGFubmVsdHlwZXMuT3JkZXIsCiAgICBjb25uZWN0aW9uSG9wcyBbXXN0cmluZywKICAgIHBvcnRJRCBzdHJpbmcsCiAgICBjaGFubmVsSUQgc3RyaW5nLAogICAgY2hhbm5lbENhcCAqY2FwYWJpbGl0eXR5cGVzLkNhcGFiaWxpdHksCiAgICBjb3VudGVycGFydHkgY2hhbm5lbHR5cGVzLkNvdW50ZXJwYXJ0eSwKICAgIHZlcnNpb24gc3RyaW5nLAopIGVycm9yIHsKICAgIC8vIGNvcmUvMDQtY2hhbm5lbC90eXBlcyBjb250YWlucyBhIGhlbHBlciBmdW5jdGlvbiB0byBzcGxpdCBtaWRkbGV3YXJlIGFuZCB1bmRlcmx5aW5nIGFwcCB2ZXJzaW9uCiAgICBtaWRkbGV3YXJlVmVyc2lvbiwgYXBwVmVyc2lvbiA9IGNoYW5uZWx0eXBlcy5TcGxpdENoYW5uZWxWZXJzaW9uKHZlcnNpb24pCiAgICBkb0N1c3RvbUxvZ2ljKCkKICAgIGltLmFwcC5PbkNoYW5PcGVuSW5pdCgKICAgICAgICBjdHgsCiAgICAgICAgb3JkZXIsCiAgICAgICAgY29ubmVjdGlvbkhvcHMsCiAgICAgICAgcG9ydElELAogICAgICAgIGNoYW5uZWxJRCwKICAgICAgICBjaGFubmVsQ2FwLAogICAgICAgIGNvdW50ZXJwYXJ0eSwKICAgICAgICBhcHBWZXJzaW9uLCAvLyBub3RlIHdlIG9ubHkgcGFzcyBhcHAgdmVyc2lvbiBoZXJlCiAgICApCn0KCmZ1bmMgT25DaGFuT3BlblRyeSgKICAgIGN0eCBzZGsuQ29udGV4dCwKICAgIG9yZGVyIGNoYW5uZWx0eXBlcy5PcmRlciwKICAgIGNvbm5lY3Rpb25Ib3BzIFtdc3RyaW5nLAogICAgcG9ydElELAogICAgY2hhbm5lbElEIHN0cmluZywKICAgIGNoYW5uZWxDYXAgKmNhcGFiaWxpdHl0eXBlcy5DYXBhYmlsaXR5LAogICAgY291bnRlcnBhcnR5IGNoYW5uZWx0eXBlcy5Db3VudGVycGFydHksCiAgICBjb3VudGVycGFydHlWZXJzaW9uIHN0cmluZywKKSAoc3RyaW5nLCBlcnJvcikgewogICAgZG9DdXN0b21Mb2dpYygpCgogICAgLy8gY29yZS8wNC1jaGFubmVsL3R5cGVzIGNvbnRhaW5zIGEgaGVscGVyIGZ1bmN0aW9uIHRvIHNwbGl0IG1pZGRsZXdhcmUgYW5kIHVuZGVybHlpbmcgYXBwIHZlcnNpb24KICAgIGNwTWlkZGxld2FyZVZlcnNpb24sIGNwQXBwVmVyc2lvbiA9IGNoYW5uZWx0eXBlcy5TcGxpdENoYW5uZWxWZXJzaW9uKGNvdW50ZXJwYXJ0eVZlcnNpb24pCgogICAgLy8gY2FsbCB0aGUgdW5kZXJseWluZyBhcHBsaWNhdGlvbnMgT25DaGFuT3BlblRyeSBjYWxsYmFjawogICAgYXBwVmVyc2lvbiwgZXJyIDo9IGFwcC5PbkNoYW5PcGVuVHJ5KAogICAgICAgIGN0eCwKICAgICAgICBvcmRlciwKICAgICAgICBjb25uZWN0aW9uSG9wcywKICAgICAgICBwb3J0SUQsCiAgICAgICAgY2hhbm5lbElELAogICAgICAgIGNoYW5uZWxDYXAsCiAgICAgICAgY291bnRlcnBhcnR5LAogICAgICAgIGNwQXBwVmVyc2lvbiwgLy8gbm90ZSB3ZSBvbmx5IHBhc3MgY291bnRlcnBhcnR5IGFwcCB2ZXJzaW9uIGhlcmUKICAgICkKICAgIGlmIGVyciAhPSBuaWwgewogICAgICAgIHJldHVybiBlcnIKICAgIH0KICAgIAogICAgbWlkZGxld2FyZVZlcnNpb24gOj0gbmVnb3RpYXRlTWlkZGxld2FyZVZlcnNpb24oY3BNaWRkbGV3YXJlVmVyc2lvbikKICAgIHZlcnNpb24gOj0gY29uc3RydWN0VmVyc2lvbihtaWRkbGV3YXJlVmVyc2lvbiwgYXBwVmVyc2lvbikKCiAgICByZXR1cm4gdmVyc2lvbgp9CgpmdW5jIE9uQ2hhbk9wZW5BY2soCiAgICBjdHggc2RrLkNvbnRleHQsCiAgICBwb3J0SUQsCiAgICBjaGFubmVsSUQgc3RyaW5nLAogICAgY291bnRlcnBhcnR5VmVyc2lvbiBzdHJpbmcsCikgZXJyb3IgewogICAgLy8gY29yZS8wNC1jaGFubmVsL3R5cGVzIGNvbnRhaW5zIGEgaGVscGVyIGZ1bmN0aW9uIHRvIHNwbGl0IG1pZGRsZXdhcmUgYW5kIHVuZGVybHlpbmcgYXBwIHZlcnNpb24KICAgIG1pZGRsZXdhcmVWZXJzaW9uLCBhcHBWZXJzaW9uID0gY2hhbm5lbHR5cGVzLlNwbGl0Q2hhbm5lbFZlcnNpb24odmVyc2lvbikKICAgIGlmICFpc0NvbXBhdGlibGUobWlkZGxld2FyZVZlcnNpb24pIHsKICAgICAgICByZXR1cm4gZXJyb3IKICAgIH0KICAgIGRvQ3VzdG9tTG9naWMoKQogICAgICAKICAgIC8vIGNhbGwgdGhlIHVuZGVybHlpbmcgYXBwbGljYXRpb25zIE9uQ2hhbk9wZW5UcnkgY2FsbGJhY2sKICAgIGFwcC5PbkNoYW5PcGVuQWNrKGN0eCwgcG9ydElELCBjaGFubmVsSUQsIGFwcFZlcnNpb24pCn0KCmZ1bmMgT25DaGFuT3BlbkNvbmZpcm0oCiAgICBjdHggc2RrLkNvbnRleHQsCiAgICBwb3J0SUQsCiAgICBjaGFubmVsSUQgc3RyaW5nLAopIGVycm9yIHsKICAgIGRvQ3VzdG9tTG9naWMoKQoKICAgIGFwcC5PbkNoYW5PcGVuQ29uZmlybShjdHgsIHBvcnRJRCwgY2hhbm5lbElEKQp9CgpPbkNoYW5DbG9zZUluaXQoCiAgICBjdHggc2RrLkNvbnRleHQsCiAgICBwb3J0SUQsCiAgICBjaGFubmVsSUQgc3RyaW5nLAopIGVycm9yIHsKICAgIGRvQ3VzdG9tTG9naWMoKQoKICAgIGFwcC5PbkNoYW5DbG9zZUluaXQoY3R4LCBwb3J0SUQsIGNoYW5uZWxJRCkKfQoKT25DaGFuQ2xvc2VDb25maXJtKAogICAgY3R4IHNkay5Db250ZXh0LAogICAgcG9ydElELAogICAgY2hhbm5lbElEIHN0cmluZywKKSBlcnJvciB7CiAgICBkb0N1c3RvbUxvZ2ljKCkKCiAgICBhcHAuT25DaGFuQ2xvc2VDb25maXJtKGN0eCwgcG9ydElELCBjaGFubmVsSUQpCn0K"}}),e._v(" "),t("p",[e._v("NOTE: Middleware that does not need to negotiate with a counterparty middleware on the remote stack will not implement the version splitting and negotiation, and will simply perform its own custom logic on the callbacks without relying on the counterparty behaving similarly.")]),e._v(" "),t("h3",{attrs:{id:"packet-callbacks"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#packet-callbacks"}},[e._v("#")]),e._v(" Packet callbacks")]),e._v(" "),t("p",[e._v("The packet callbacks just like the handshake callbacks wrap the application's packet callbacks. The packet callbacks are where the middleware performs most of its custom logic. The middleware may read the packet flow data and perform some additional packet handling, or it may modify the incoming data before it reaches the underlying application. This enables a wide degree of usecases, as a simple base application like token-transfer can be transformed for a variety of usecases by combining it with custom middleware.")]),e._v(" "),t("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"T25SZWN2UGFja2V0KAogICAgY3R4IHNkay5Db250ZXh0LAogICAgcGFja2V0IGNoYW5uZWx0eXBlcy5QYWNrZXQsCikgaWJjZXhwb3J0ZWQuQWNrbm93bGVkZ2VtZW50IHsKICAgIGRvQ3VzdG9tTG9naWMocGFja2V0KQoKICAgIGFjayA6PSBhcHAuT25SZWN2UGFja2V0KGN0eCwgcGFja2V0KQoKICAgIGRvQ3VzdG9tTG9naWMoYWNrKSAvLyBtaWRkbGV3YXJlIG1heSBtb2RpZnkgb3V0Z29pbmcgYWNrCiAgICByZXR1cm4gYWNrCn0KCk9uQWNrbm93bGVkZ2VtZW50UGFja2V0KAogICAgY3R4IHNkay5Db250ZXh0LAogICAgcGFja2V0IGNoYW5uZWx0eXBlcy5QYWNrZXQsCiAgICBhY2tub3dsZWRnZW1lbnQgW11ieXRlLAopICgqc2RrLlJlc3VsdCwgZXJyb3IpIHsKICAgIGRvQ3VzdG9tTG9naWMocGFja2V0LCBhY2spCgogICAgYXBwLk9uQWNrbm93bGVkZ2VtZW50UGFja2V0KGN0eCwgcGFja2V0LCBhY2spCn0KCk9uVGltZW91dFBhY2tldCgKICAgIGN0eCBzZGsuQ29udGV4dCwKICAgIHBhY2tldCBjaGFubmVsdHlwZXMuUGFja2V0LAopICgqc2RrLlJlc3VsdCwgZXJyb3IpIHsKICAgIGRvQ3VzdG9tTG9naWMocGFja2V0KQoKICAgIGFwcC5PblRpbWVvdXRQYWNrZXQoY3R4LCBwYWNrZXQpCn0K"}}),e._v(" "),t("h3",{attrs:{id:"ics-4-wrappers"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ics-4-wrappers"}},[e._v("#")]),e._v(" ICS-4 Wrappers")]),e._v(" "),t("p",[e._v("Middleware must also wrap ICS-4 so that any communication from the application to the channelKeeper goes through the middleware first. Similar to the packet callbacks, the middleware may modify outgoing acknowledgements and packets in any way it wishes.")]),e._v(" "),t("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gb25seSBjYWxsZWQgZm9yIGFzeW5jIGFja3MKZnVuYyBXcml0ZUFja25vd2xlZGdlbWVudCgKICBwYWNrZXQgY2hhbm5lbHR5cGVzLlBhY2tldCwKICBhY2tub3dsZWRnZW1lbnQgW11ieXRlcykgewogICAgLy8gbWlkZGxld2FyZSBtYXkgbW9kaWZ5IGFja25vd2xlZGdlbWVudAogICAgYWNrX2J5dGVzID0gZG9DdXN0b21Mb2dpYyhhY2tub3dsZWRnZW1lbnQpCgogICAgcmV0dXJuIGljczRLZWVwZXIuV3JpdGVBY2tub3dsZWRnZW1lbnQocGFja2V0LCBhY2tfYnl0ZXMpCn0KCmZ1bmMgU2VuZFBhY2tldChhcHBQYWNrZXQgY2hhbm5lbHR5cGVzLlBhY2tldCkgewogICAgLy8gbWlkZGxld2FyZSBtYXkgbW9kaWZ5IHBhY2tldAogICAgcGFja2V0ID0gZG9DdXN0b21Mb2dpYyhhcHBfcGFja2V0KQoKICAgIHJldHVybiBpY3M0S2VlcGVyLlNlbmRQYWNrZXQocGFja2V0KQp9CgovLyBtaWRkbGV3YXJlIG11c3QgcmV0dXJuIHRoZSB1bmRlcmx5aW5nIGFwcGxpY2F0aW9uIHZlcnNpb24gCmZ1bmMgR2V0QXBwVmVyc2lvbihjdHggc2RrLkNvbnRleHQsIHBvcnRJRCwgY2hhbm5lbElEIHN0cmluZykgKHN0cmluZywgYm9vbCkgewogICAgdmVyc2lvbiwgZm91bmQgOj0gaWNzNEtlZXBlci5HZXRBcHBWZXJzaW9uKGN0eCwgcG9ydElELCBjaGFubmVsSUQpCiAgICBpZiAhZm91bmQgewogICAgICAgIHJldHVybiAmcXVvdDsmcXVvdDssIGZhbHNlCiAgICB9CgogICAgaWYgIU1pZGRsZXdhcmVFbmFibGVkIHsKICAgICAgICByZXR1cm4gdmVyc2lvbiwgdHJ1ZQogICAgfQoKICAgIC8vIHVud3JhcCBjaGFubmVsIHZlcnNpb24KICAgIG1ldGFkYXRhLCBlcnIgOj0gVW5tYXJzaGFsKHZlcnNpb24pCiAgICBpZiBlcnIgIT0gbmlsIHsKICAgICAgICBwYW5pYyhmbXQuRXJyb2YoJnF1b3Q7dW5hYmxlIHRvIHVubWFyc2hhbCB2ZXJzaW9uOiAldyZxdW90OywgZXJyKSkKICAgIH0KCiAgICByZXR1cm4gbWV0YWRhdGEuQXBwVmVyc2lvbiwgdHJ1ZQp9Cg=="}})],1)}),[],!1,null,null,null);a.default=c.exports}}]);