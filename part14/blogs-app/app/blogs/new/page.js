"use client"
import { useActionState } from "react"
import { createBlog } from "../../actions/blogs"

const initialState = { errors: {}, values: { title: "", author: "", url: "" } }

export default function NewBlog() {
  const [state, formAction] = useActionState(createBlog, initialState)

  return (
    <form action={formAction}>
      <input name="title" defaultValue={state.values?.title} />
      {state.errors?.title && <p style={{ color: "red" }}>{state.errors.title}</p>}

      <input name="author" defaultValue={state.values?.author} />
      {state.errors?.author && <p style={{ color: "red" }}>{state.errors.author}</p>}

      <input name="url" defaultValue={state.values?.url} />
      {state.errors?.url && <p style={{ color: "red" }}>{state.errors.url}</p>}

      <button type="submit">Create</button>
    </form>
  )
}