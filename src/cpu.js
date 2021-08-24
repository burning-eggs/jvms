const createMemory = require("./create-memory")

class CPU {
    constructor(memory) {
        this.memory = memory

        this.registerNames = [
            'ip', 'acc',
            'r1', 'r2', 'r3', 'r4',
            'r5', 'r6', 'r7', 'r8'
        ]

        this.registers = createMemory(this.registerNames.length * 2)

        this.registerMap = this.registerNames.reduce((map, name, i) => {
            map[name] = i * 2

            return map
        }, {})
    }

    getRegister(name) {
        if (!(name in this.registerMap)) {
            throw new Error(`[getRegister] REGISTER '${name}' NOT FOUND`)
        }

        return this.registers.getUint16(this.registerMap[name])
    }

    setRegister(name, value) {
        if (!(name in this.registerMap)) {
            throw new Error(`[etRegister] REGISTER '${name}' NOT FOUND`)
        }

        return this.registers.setUint16(this.registerMap[name], value)
    }

    fetch() {
        const nextInstructionAddress = this.getRegister('ip')
        const instruction = this.memory.getUint8(nextInstructionAddress)

        this.setRegister('ip', nextInstructionAddress + 1)

        return instruction
    }
}

module.exports = CPU