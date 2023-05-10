export default function Contact() {
    return (
        <div>
            <h1 className="mt-4 text-xl font-bold text-center">Contact Me</h1>
            <div>
                <form
                    className="flex flex-col space-y-4 mt-2"
                    acceptCharset="UTF-8"
                    action="https://getform.io/f/256f42f5-810e-4dcf-89a4-299132b43f95"
                    method="POST"
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="rounded-md p-1 border-solid border-2 border-black dark:border-white"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="rounded-md p-1 border-solid border-2 border-black dark:border-white"
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        className="rounded-md p-1 h-14 border-solid border-2 border-black  dark:border-white"
                    />
                    <button
                        type="submit"
                        className="w-fit dark:bg-white bg-black text-white dark:text-black px-6 rounded font-bold"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
