import { useState, useEffect, useRef } from 'react'

export default function ChaosMode({ image, title }) {
	const canvas = useRef(null)
	const [showMirror, setShowMirror] = useState(false)

	async function setupCanvas() {
		if (!showMirror) return

		const REGL = (await import('regl')).default
		const {
			Hydra,
			generators: { src, osc },
		} = await import('hydra-ts')

		const regl = REGL({ canvas: canvas.current })
		const hydra = new Hydra({ regl, width: 1600, height: 900 })
		const { loop, sources, outputs } = hydra
		const time = hydra.synth.time
		const [s0] = sources
		const [o0] = outputs

		loop.start()
		s0.initCam()
		src(s0).out(o0)
		osc(10, 4, 1.7)
			.layer(src(s0).invert().luma().invert().saturate(4))
			.blend(o0, 0.94)
			.modulateScale(osc(1, 0, 1), -0.03)
			.scale(1, () => 1.05 + 0.1 * Math.sin(0.2 * time))
			.out(hydra.output)
	}

	useEffect(() => {
		setupCanvas()
	}, [showMirror])

	return (
		<>
			{showMirror && (
				<canvas width={image?.width} height={image?.height} ref={canvas} />
			)}

			{image && !showMirror && (
				<img
					src={`/images/${image.url}`}
					alt={image.alt}
					width={image.width}
					height={image.height}
					className={`w-full h-auto${image.effect === false ? ' no-effect' : ''}`}
				/>
			)}

			<h1 className="split">
				{title}
				<button
					className="chaos-mode"
					onClick={() => setShowMirror(!showMirror)}
				>
					{!showMirror ? 'chaos mode' : 'return to stasis'}
				</button>
			</h1>
		</>
	)
}
