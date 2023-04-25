import { useState } from "react"
import { useForm } from "react-hook-form"

export const CommentForm = ({ _id }: any) => {
  // Sets up basic data state
  const [formData, setFormData]: any = useState({ name: "", email: "", comment: "" })

  // Sets up our form states 
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // Prepares the functions from react-hook-form
  const { register, handleSubmit, watch } = useForm()

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

    try {
      await fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      setIsSubmitting(false)
      setHasSubmitted(true)
    } catch (err) {
      setFormData(err)
    }
  }

  return (
    // Sets up the Form markup
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
      <input {...register("register")} type="hidden" name="post" value={_id} />

      <label className="block mb-5">
        <span className="text-gray-700">Name</span>
        <input {...register("name")} name="name" className="form-input mt-1 block w-full" placeholder="John Appleseed" />
      </label>

      <label className="block mb-5">
        <span className="text-gray-700">Email</span>
        <input  {...register("email")} name="email" type="email" className="form-input mt-1 block w-full" placeholder="your@email.com" />
      </label>

      <label className="block mb-5">
        <span className="text-gray-700">Comment</span>
        <textarea  {...register("comment")} name="comment" className="form-textarea mt-1 block w-full" rows={8} placeholder="Enter some long form content."></textarea>
      </label>

      <input type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" />
    </form>
  )
}
