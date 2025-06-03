module.exports = {
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',     // ✨ New feature
                'fix',      // 🐛 Bug fix
                'chore',    // 🔧 Build or dev change
                'refactor', // 🧠 Code refactor
                'docs',     // 📚 Documentation
                'style',    // 🎨 Formatting, no logic change
                'test',     // ✅ Adding or changing tests
                'perf',     // 🚀 Performance improvement
                'ci'        // 🛠 CI/CD related
            ]
        ],
        'subject-case': [0], // Allow any subject casing
    }
};
