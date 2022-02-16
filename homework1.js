class Publication {
	#title;
	#author;

	constructor(title, author) {
		if (!title || !author) {
			throw new Error(
				"I need a title and author to create a publication"
			);
		}
		this.title = title;
		this.author = author;
	}
	isPublication() {
		return this.title !== undefined && this.author !== undefined;
	}
	getTitle() {
		return this.title;
	}
	getAuthor() {
		return this.author;
	}
}
class Book extends Publication {
	#publisher;
	#year;

	constructor(title, author, year, publisher) {
		if (!publisher || !year) {
			throw new Error("I need a publisher and year to create a book");
		}
		super(title, author);
		this.publisher = publisher;
		this.year = year;
	}
	getPublisher() {
		return this.publisher;
	}
	getYear() {
		return this.year;
	}
	isBook() {
		return (
			this.isPublication() &&
			this.publisher !== undefined &&
			this.year !== undefined
		);
	}
	citeAPA() {
		return `${this.getAuthor()} (${this.year}). ${this.getTitle()}. ${
			this.publisher
		}`;
	}
	citeMLA() {
		return `${this.getAuthor()}. ${this.getTitle()}. ${this.year}`;
	}
}

class Paper extends Publication {
	#journal;
	#volume;
	#year;

	constructor(title, author, year, journal, volume) {
		if (!journal || !volume || !year) {
			throw new Error(
				"I need a journal, volume and year to create a new paper"
			);
		}
		super(title, author);
		this.journal = journal;
		this.volume = volume;
		this.year = year;
	}
	getJournal() {
		return this.journal;
	}
	getVolume() {
		return this.volume;
	}
	getYear() {
		return this.year;
	}
	isPaper() {
		if (
			this.isPublication() &&
			this.journal !== undefined &&
			this.volume !== undefined &&
			this.year !== undefined
		) {
			return true;
		}
		return false;
	}
	citeAPA() {
		return `${this.getAuthor()} (${this.year}). ${this.getTitle()}. ${
			this.journal
		} : ${this.volume}`;
	}
	citeMLA() {
		return `${this.getAuthor()}. ${this.getTitle()}. ${this.year}`;
	}
}
class WebPage extends Publication {
	#URL;
	#date;
	constructor(title, author, URL, date) {
		if (!URL || !date) {
			throw new Error("I need an URL and date to create a webpage");
		}
		super(title, author);
		this.URL = URL;
		this.date = date;
	}
	isWebPage() {
		if (
			this.isPublication() &&
			this.URL !== undefined &&
			this.date !== undefined
		) {
			return true;
		}
		return false;
	}
	citeAPA() {
		return `${this.getTitle()}. Retrieved ${this.date}, from ${this.URL}`;
	}
	citeMLA() {
		return `"${this.getTitle()}." Web. ${this.date} <${this.URL}>`;
	}
}
class PublicationManager {
	#publications = [];
	addPaper(title, author, year, journal, volume) {
		this.#publications.push(new Paper(title, author, year, journal, volume));
	}
	addBook(title, author, year, publisher) {
		this.#publications.push(new Book(title, author, year, publisher));
	}
	addWebPage(title, author, URL, date) {
		this.#publications.push(new WebPage(title, author, URL, date));
	}
	printCitations(type) {
		for (let pub of this.#publications) {
			if (type === "APA") console.log(pub.citeAPA());
			else console.log(pub.citeMLA());
		}
	}
	removeCitations(num) {
		this.#publications.splice(num - 1, 1);
	}
}

const pubManager = new PublicationManager();
pubManager.addPaper(
	"Test Paper Title",
	"Test Paper Author",
	2022,
	"Program Design Paradigms",
	5010
);
pubManager.addBook(
	"Test Book Title",
	"Test Book Author",
	2022,
	"Northeastern University"
);
pubManager.addWebPage(
	"Test Webpage Title",
	"Test Webpage Author",
	"www.hw1test.com",
	"Feb 6, 2022"
);
console.log("APA:");
pubManager.printCitations("APA");
console.log("MLA");
pubManager.printCitations("MLA");
console.log("remove 2nd citation:");
pubManager.removeCitations(2);
console.log("APA:");
pubManager.printCitations("APA");
console.log("MLA:");
pubManager.printCitations("MLA");
