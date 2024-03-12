import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfileDropDown() {
    const profileDetails = useSelector(state => state.profile.user);
    const navigate = useNavigate()
    const onSignOut = () => {
        const loading = toast.loading('Loading', {
            toastId: "123",
            position: "top-center",
            hideProgressBar: true,
            autoClose: false,
        });
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            toast.success('Signed Out', {
                toastId: "789",
                position: "top-center",
                hideProgressBar: true,
                autoClose: 2000,
            });
            navigate("/");
            window.location.reload();
        } catch (error) {
            toast.error('There was a problem signing you out', {
                toastId: "789",
                position: "top-center",
                hideProgressBar: true,
                autoClose: 2000,
            });
        } finally {
            toast.dismiss(loading);
        }
    }
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button>
                    <img src={profileDetails.image} className='rounded-full w-7' />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-richblack-500 rounded-md bg-richblack-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <p className='text-richblack-50 block px-4 py-2 text-sm'>Signed in as {profileDetails.email}</p>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-grey-900' : 'text-richblack-50',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Dashboard
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-grey-900' : 'text-richblack-50',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Settings
                                </a>
                            )}
                        </Menu.Item>
                    </div>

                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={onSignOut}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-grey-900' : 'text-richblack-50',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Sign Out
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
