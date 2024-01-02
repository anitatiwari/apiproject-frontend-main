import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import toast from 'react-hot-toast'
export default function CreatePostModal() {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const title = e.target.title.value;
        const description = e.target.description.value;

        const data = {  
            title: title,
            content: description
        }

        fetch('http://localhost:3001/post/posts', {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((response) => {
            if(response.ok) {
                toast.success('Post created successfully')

            }
            else {
                toast.error('Error creating post')
            }
            
        })
        .catch((err) => {
            console.log(err)
            toast.error('Error creating post')
        })





        closeModal()
        window.location.reload();

    }

    return (
        <>
        <div className='pb-6'>
            
       
            <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-black p-3 text-sm font-medium text-white hover:bg-slate-700 border-2 border-black-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >

                Create Post  +
            </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <form className="fixed inset-0 overflow-y-auto" onSubmit={handleSubmit}>
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Create New Post
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className="col-span-full">
                                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                                            <div className="mt-2">
                                                <textarea id="title" name="title" rows={2} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={""} />
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-gray-600">Create a title for your post</p>
                                        </div>

                                    </div>
                                    <div className="mt-2">
                                        <div className="col-span-full">
                                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                            <div className="mt-2">
                                                <textarea id="description" name="description" rows={3} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={""} />
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the post.</p>
                                        </div>

                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="su"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                           
                                        >
                                            Create Post
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </form>
                </Dialog>
            </Transition>
        </>
    )
}
