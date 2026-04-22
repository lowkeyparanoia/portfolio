export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll"]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.D-ZXpApa.js",app:"_app/immutable/entry/app.BqIZ3hUD.js",imports:["_app/immutable/entry/start.D-ZXpApa.js","_app/immutable/chunks/D7BY12jk.js","_app/immutable/chunks/BgemXhw2.js","_app/immutable/entry/app.BqIZ3hUD.js","_app/immutable/chunks/BgemXhw2.js","_app/immutable/chunks/CqTN4O4N.js","_app/immutable/chunks/D3FBpr-t.js","_app/immutable/chunks/DmiMSliS.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
