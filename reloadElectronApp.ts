import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import electronPath from "electron";

let electronApp: ChildProcessWithoutNullStreams | undefined

//重新加载应用
export default function reloadElectronApp() {
	if (electronApp) {
		electronApp.removeAllListeners()
		electronApp.kill()
	}

	// Start Electron.app
	electronApp = spawn(electronPath as unknown as string, ['.', '--no-sandbox'])
	// Exit command after Electron.app exits
	electronApp.once('exit', process.exit)

	electronApp.stdout?.on('data', (data) => {
		const str = data.toString().trim()
		str && console.log(str)
	})
	electronApp.stderr?.on('data', (data) => {
		const str = data.toString().trim()
		str && console.error(str)
	})
}