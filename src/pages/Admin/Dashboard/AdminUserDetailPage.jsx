import { mockUser } from "../../../constants/listing";

const AdminUserDetailPage = () => {
    return (
        <div className='min-h-screen bg-[#fff] p-4 rounded-md'>
            {/* Page Title */}
            <h1 className='text-xl -semibold text-gray-900 mb-6'>Owner detail</h1>

            {/* Main content area */}
            <div className='p-6 sm:p-8 flex flex-col md:flex-row gap-8'>
                {/* Left column: Profile Section */}
                <div className='flex flex-col items-center md:items-start md:w-1/4'>
                    <img src={mockUser.avatar} alt="User Avatar" className='w-28 h-28 rounded-full object-cover mb-4'/>
                    <h2 className='text-xl -bold text-gray-900 mb-2'>{mockUser.name}</h2>
                    <div className='flex items-center mb-4'>
                        <span className={`px-3 py-1 rounded-full text-xs -semibold ${mockUser.accountStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{mockUser.accountStatus}</span>
                    </div>
                    <p className='text-sm text-gray-600 mb-1'>
                        <span className='-medium'>Joined date:</span> {mockUser.joinedDate}
                    </p>
                    <p className='text-sm text-gray-600'>
                        <span className='-medium'>Last login:</span> {mockUser.lastLogin}
                    </p>
                </div>

                {/* Right column: Personal Information */}
                <div className='flex-1 md:w-3/4 border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0 md:pl-8'>
                    <h3 className='text-lg -semibold text-gray-900 mb-4'>Personal information</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700'>
                        {/* First Name */}
                        <div>
                            <p className='-medium text-sm'>First Name</p>
                            <p className='text-base'>{mockUser.personalInfo.firstName}</p>
                        </div>
                        {/* Last Name */}
                        <div>
                            <p className='-medium text-sm'>Last Name</p>
                            <p className='text-base'>{mockUser.personalInfo.lastName}</p>
                        </div>
                        {/* Email Address */}
                        <div>
                            <p className='-medium text-sm'>Email address</p>
                            <p className='text-base'>{mockUser.personalInfo.emailAddress}</p>
                        </div>
                        {/* Phone Number */}
                        <div>
                            <p className='-medium text-sm'>Phone number</p>
                            <p className='text-base'>{mockUser.personalInfo.phoneNumber}</p>
                        </div>
                        {/* Date of birth */}
                        <div>
                            <p className='-medium text-sm'>Date of birth</p>
                            <p className='text-base'>{mockUser.personalInfo.dateOfBirth}</p>
                        </div>
                        {/* Region */}
                        <div>
                            <p className='-medium text-sm'>Region</p>
                            <p className='text-base'>{mockUser.personalInfo.region}</p>
                        </div>
                        {/* Province */}
                        <div>
                            <p className='-medium text-sm'>Province</p>
                            <p className='text-base'>{mockUser.personalInfo.province}</p>
                        </div>
                        {/* City */}
                        <div>
                            <p className='-medium text-sm'>City</p>
                            <p className='text-base'>{mockUser.personalInfo.city}</p>
                        </div>
                        {/* Zip */}
                        <div>
                            <p className='-medium text-sm'>Zip</p>
                            <p className='text-base'>{mockUser.personalInfo.zip}</p>
                        </div>
                        {/* Address 1 */}
                        <div>
                            <p className='-medium text-sm'>Address 1</p>
                            <p className='text-base'>{mockUser.personalInfo.address1}</p>
                        </div>
                        {/* Address 2 */}
                        <div>
                            <p className='-medium text-sm'>Address 2</p>
                            <p className='text-base'>{mockUser.personalInfo.address2}</p>
                        </div>
                        {/* About owner */}
                        <div className='sm:col-span-2'>
                            <p className='-medium text-sm'>About owner</p>
                            <p className='text-base'>{mockUser.personalInfo.aboutOwner}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserDetailPage;
