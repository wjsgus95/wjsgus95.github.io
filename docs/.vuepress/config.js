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
            { text: 'Home', link: '/' },
            { text: 'About', link: '/about/' },
            { text: 'CV', link: '/cv/' },
            { text: 'Github', link: 'https://www.github.com/wjsgus95' },
        ],
        personalInfo: {
            nickname: 'june',
            description: '(wanna be) jr backend devloper',
            email: 'wjsgus95@yonsei.ac.kr',
            location: 'South Korea',
            organization: 'Yonsei University',
            avatar: '/img/profile.jpg',
            //avatar: 'https://raw.githubusercontent.com/wjsgus95/blog-vuepress/gh-pages/img/profile.jpg',

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
            repo: 'blog-vuepress',
            clientId: '83e57b33578d7e181898',
            clientSecret: 'ea2578531c64721d7a6ef15a111dde6fcbc20c2c',
            autoCreateIssue: process.env.NODE_ENV !== 'development', // Optional, this will not create issue autoly in development mode
        },
    },
    // Plugins
    plugins: [
        [
            '@vuepress/blog',
            {
                sitemap: {
                    hostname: 'https://wjsgus95.github.io',
                },
            },
        ],
    ],
    // Deploy base
    base: "/blog-vuepress/",
}
