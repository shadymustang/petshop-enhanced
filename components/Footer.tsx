import React from 'react'

export default function Footer() {
	return (
		<footer className="mt-20 border-t">
			<div className="max-w-7xl mx-auto px-6 py-10 flex items-center justify-between">
				<div>
					<div className="font-bold text-royalBlue">Royal Pet Care</div>
					<div className="text-sm text-slate-600">Premium pet food, grooming & accessories</div>
				</div>
				<div className="text-sm text-slate-500">© {new Date().getFullYear()} Royal Pet Care — All rights reserved.</div>
			</div>
		</footer>
	)
}

