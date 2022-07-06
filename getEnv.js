const { readFileSync, existsSync } = require("fs")

function getEnv(name) {
    if (!name) return null;

    const envFile = "/ql/scripts/env.json"
    if (!existsSync(envFile)) {
      console.log('读取配置文件失败!!!:', envFile);
      return null;
    }

    try {
        const env = JSON.parse(readFileSync(envFile, 'utf-8'))
        let val = env[name] || env[name.toLowerCase()] || env[name.toUpperCase()];
        if (val) val = val.trim()
        console.log(`读取配置文件成功: ${envFile} ${name}`)
        return val;
    } catch (error) {
        console.log('读取配置文件失败:', error)
        return null;
    }

    const fromEnv = process.env[name] || process.env[name.toLowerCase()] || process.env[name.toUpperCase()]
    if (fromEnv) return fromEnv.trim();

}

module.exports = { getEnv }
