module.exports = {
  title: 'June\'s blog',
  // Markdown config
  markdown: {
	lineNumbers: true
  },
  // Theme config
  theme: 'vuepress-theme-meteorlxy',
  themeConfig: {
	lang: 'en-US',
	nav: [
	  { text: 'Home', link: '/', exact: true },
	  { text: 'Posts', link: '/posts/', exact: false },
	  { text: 'CV', link: '/cv/', exact: false },
	  { text: 'Github', link: 'https://www.github.com/wjsgus95' },
	],
	personalInfo: {
	  nickname: 'June',
	  description: 'Jr Backend Engineer',
	  email: 'wjsgus95@yonsei.ac.kr',
	  location: 'South Korea',
	  organization: 'Coupang',
	  avatar: '/img/profile.jpg',

	  sns: {
		github: {
		  account: 'wjsgus95',
		  link: 'https://github.com/wjsgus95',
		},
		linkedin: {
		  account: 'wjsgus95',
		  link: 'https://www.linkedin.com/in/hyunjun-jeon-89182310a/',
		},
	  },
	},

	footer: {
	  poweredByTheme: false,
	},
	// Show the last updated time of your posts
	lastUpdated: true,
	// Pagination config (Optional)
	pagination: {
	  perPage: 10,
	},

	// Comments Config
	comments: {
	  platform: 'github', // Optional, default is 'github'. You can also choose 'gitlab', 'bitbucket'. Check Vssue docs for details.
	  owner: 'wjsgus95',
	  repo: 'wjsgus95.github.io',
	  clientId: '83e57b33578d7e181898',
	  clientSecret: 'ea2578531c64721d7a6ef15a111dde6fcbc20c2c',
	  autoCreateIssue: process.env.NODE_ENV !== 'development', // Optional, this will not create issue autoly in development mode
	},
  },
  // index.html head props
  head: [
	[		
      'meta', {
		name: "google-site-verification",
		content: "ZjUmcoLp3qIZx_rFmGsfAz4lkzB4Fw64G36nLi_5ATk",
	  },
	],
  ],
  // Plugins
  plugins: [
	[		
		'sitemap',
		{				
			hostname: 'https://wjsgus95.github.io',
		},
	],
	[
	  'vuepress-plugin-google-tag-manager',
	  {
		'gtm': 'GTM-W39H86Z',
	  }
	],
  ],
}
