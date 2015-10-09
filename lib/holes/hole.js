"use strict"

class Hole {

	get name() {
		return "Generic hole";
	}

	get description() {
		return "Commands entering this hole come out on the other end with no return values."
	}

	static process() {
		// this is the default function called when invoked.
		// subclasses should override all three instance and class methods.
	}

}

module.exports = Hole;
