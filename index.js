const createMemory = require("./src/create-memory")
const CPU = require("./src/cpu")
const instructions = require("./src/instructions")

const memory = createMemory(256)
const writableBytes = new Uint8Array(memory.buffer)

const cpu = new CPU(memory)

writableBytes[0] = instructions.MOV_LIT_R1
writableBytes[1] = 0x12 // 0x1234
writableBytes[2] = 0x34

writableBytes[3] = instructions.MOV_LIT_R2
writableBytes[4] = 0xAB // 0xABCD
writableBytes[5] = 0xCD

writableBytes[6] = instructions.ADD_REG_REG
writableBytes[7] = 2 // r1 idx
writableBytes[8] = 3 // r2 idx

cpu.debug()

cpu.step()
cpu.debug()

cpu.step()
cpu.debug()

cpu.step()
cpu.debug()