import { useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { useForm } from "react-hook-form"

export const CommentForm = ({ _id }: any) => {

    const { executeRecaptcha } = useGoogleReCaptcha();

    // Sets up basic data state
    const [formData, setFormData]: any = useState({ name: "", email: "", comment: "" })

    // Sets up our form states 
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    // Prepares the functions from react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm()

    if (isSubmitting) {
        // Returns a "Submitting comment" state if being processed
        return <h3>Submitting comment…</h3>
    }

    if (hasSubmitted) {
        // Returns the data that the user submitted for them to preview after submission
        return (
            <>
                <h3>Thanks for your comment!</h3>
                <ul>
                    <li>
                        Name: {formData.name} <br />
                        Email: {formData.email} <br />
                        Comment: {formData.comment}
                    </li>
                </ul>
            </>
        )
    }

    const onSubmit = async (data: any) => {
        setIsSubmitting(true)
        setFormData(data)

        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available");
            return;
        }

        try {
            const token = await executeRecaptcha();
            if (!token) {
                console.log("failed to send");
                return;
            }


            await fetch('/api/createComment', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            setIsSubmitting(false)
            setHasSubmitted(true)
        } catch (err) {
            setFormData(err)
        }
    }

    return (
        <>
            {
                // Sets up the Form markup
                // Input fields should use aria-invalid to indicate field contain error.
                // Should use role="alert" to announce the error messages.
            }
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">

                <input {...register("register")} type="hidden" name="post" value={_id} />

                <div className="block mb-5">
                    <label htmlFor="name" className="text-gray-700">Name</label>

                    <input {...register("name", { required: true, maxLength: 60 })}
                        name="name" placeholder="John Cena"
                        aria-invalid={errors.name ? "true" : "false"}
                        className="form-input mt-1 block w-full" />
                    {errors.name?.type === "required" && <p className="text-red-400" role="alert">Name can&apos;t be empty.</p>}
                    {errors.name?.type === "maxLength" && <p className="text-red-400" role="alert">Name can&apos;t be longer than 60 characters.</p>}
                </div>

                <div className="block mb-5">
                    <label htmlFor="email" className="text-gray-700">Email</label>
                    <input  {...register("email", { pattern: /^\S+@\S+$/i, required: true, maxLength: 254, minLength: 5 })}
                        name="email" type="email" className="form-input mt-1 block w-full" placeholder="your@email.com" />
                    {errors.email?.type === "required" && <p className="text-red-400" role="alert">Email can&apos;t be empty.</p>}
                    {errors.email?.type === "maxLength" && <p className="text-red-400" role="alert">Email can&apos;t be longer than 254 characters.</p>}
                    {errors.email?.type === "minLength" && <p className="text-red-400" role="alert">Email can&apos;t be shorter than 5 characters.</p>}
                    {errors.email?.type === "pattern" && <p className="text-red-400" role="alert">Email is invalid.</p>}
                </div>

                <div className="block mb-5">
                    <label htmlFor="comment" className="text-gray-700">Comment</label>
                    <textarea  {...register("comment", { required: true, maxLength: 1024 })}
                        name="comment" placeholder="Enter your comment here."
                        className="form-textarea mt-1 block w-full" rows={8}
                        aria-invalid={errors.comment ? "true" : "false"}
                    ></textarea>
                    {errors.comment?.type === "required" && <p className="text-red-400" role="alert">Comment can&apos;t be empty.</p>}
                    {errors.comment?.type === "maxLength" && <p className="text-red-400" role="alert">Comment can&apos;t be longer than 1024 characters.</p>}
                </div>

                <input type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" />
            </form >
        </>
    )
}
