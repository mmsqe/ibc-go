(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{621:function(t,e,n){"use strict";n.r(e);var o=n(0),a=Object(o.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"overview"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),n("p",{attrs:{synopsis:""}},[t._v("Learn about what the Interchain Accounts module is, and how to build custom modules that utilize Interchain Accounts functionality")]),t._v(" "),n("h2",{attrs:{id:"what-is-the-interchain-accounts-module"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#what-is-the-interchain-accounts-module"}},[t._v("#")]),t._v(" What is the Interchain Accounts module?")]),t._v(" "),n("p",[t._v("Interchain Accounts is the Cosmos SDK implementation of the ICS-27 protocol, which enables cross-chain account management built upon IBC. Chains using the Interchain Accounts module can programmatically create accounts on other chains and control these accounts via IBC transactions.")]),t._v(" "),n("p",[t._v("Interchain Accounts exposes a simple-to-use API which means IBC application developers do not require an in-depth knowledge of the underlying low-level details of IBC or the ICS-27 protocol.")]),t._v(" "),n("p",[t._v("Developers looking to build upon Interchain Accounts must write custom logic in their own IBC application module, called authentication modules.")]),t._v(" "),n("ul",[n("li",[t._v("How is an interchain account different than a regular account?")])]),t._v(" "),n("p",[t._v("Regular accounts use a private key to sign transactions on-chain. Interchain Accounts are instead controlled programmatically by separate chains via IBC transactions. Interchain Accounts are implemented as sub-accounts of the interchain accounts module account.")]),t._v(" "),n("h2",{attrs:{id:"concepts"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#concepts"}},[t._v("#")]),t._v(" Concepts")]),t._v(" "),n("p",[n("code",[t._v("Host Chain")]),t._v(": The chain where the interchain account is registered. The host chain listens for IBC packets from a controller chain which should contain instructions (e.g. cosmos SDK messages) for which the interchain account will execute.")]),t._v(" "),n("p",[n("code",[t._v("Controller Chain")]),t._v(": The chain registering and controlling an account on a host chain. The controller chain sends IBC packets to the host chain to control the account. A controller chain must have at least one interchain accounts authentication module in order to act as a controller chain.")]),t._v(" "),n("p",[n("code",[t._v("Authentication Module")]),t._v(": A custom IBC application module on the controller chain that uses the Interchain Accounts module API to build custom logic for the creation & management of interchain accounts. For a controller chain to utilize the interchain accounts module functionality, an authentication module is required.")]),t._v(" "),n("p",[n("code",[t._v("Interchain Account")]),t._v(": An account on a host chain. An interchain account has all the capabilities of a normal account. However, rather than signing transactions with a private key, a controller chain's authentication module will send IBC packets to the host chain which signals what transactions the interchain account should execute.")]),t._v(" "),n("h2",{attrs:{id:"sdk-security-model"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#sdk-security-model"}},[t._v("#")]),t._v(" SDK Security Model")]),t._v(" "),n("p",[t._v("SDK modules on a chain are assumed to be trustworthy.  For example, there are no checks to prevent an untrustworthy module from accessing the bank keeper.")]),t._v(" "),n("p",[t._v("The implementation of ICS27 on ibc-go uses this assumption in its security considerations. The implementation assumes the authentication module will not try to open channels on owner addresses it does not control.")]),t._v(" "),n("p",[t._v("The implementation assumes other IBC application modules will not bind to ports within the ICS27 namespace.")])])}),[],!1,null,null,null);e.default=a.exports}}]);