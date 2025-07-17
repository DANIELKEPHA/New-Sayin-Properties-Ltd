'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { useCreateContactMutation } from '@/state/api';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

// Form validation schema
const formSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    interests: z.array(z.string()).nonempty('Select at least one interest'),
    privacyConsent: z
        .boolean()
        .refine((val) => val, 'You must agree to the Privacy Policy'),
    message: z.string().max(500, 'Message is too long').optional(),
});

type FormData = z.infer<typeof formSchema>;

const NewsLetter = () => {
    const [createContact, { isLoading: isSubmitting }] = useCreateContactMutation();
    const [userInfo, setUserInfo] = useState<{
        tenantCognitoId: string | null;
        email: string | null;
    }>({ tenantCognitoId: null, email: null });
    const [isLoadingSession, setIsLoadingSession] = useState(true);

    // Interests options
    const interestOptions = [
        { id: 'market-trends', label: 'Market Trends' },
        { id: 'investment-tips', label: 'Investment Tips' },
        { id: 'property-listings', label: 'New Listings' },
        { id: 'interior-design', label: 'Interior Design' },
        { id: 'neighborhood-guides', label: 'Neighborhood Guides' },
    ];

    // Fetch user session on mount
    useEffect(() => {
        const fetchUserSession = async () => {
            try {
                const session = await fetchAuthSession({ forceRefresh: true });
                const user = await getCurrentUser();
                // Stricter validation for userId
                const tenantCognitoId = user.userId.trim() !== '' ? user.userId : null;
                const email = session.tokens?.idToken?.payload?.email as string | undefined;

                console.log('Fetched user info:', { tenantCognitoId, email, rawUserId: user.userId, fullUser: user });
                setUserInfo({ tenantCognitoId, email: email || null });
            } catch (error: any) {
                console.log('No user session found, allowing unauthenticated submission:', { error: error.message, errorDetails: error });
                setUserInfo({ tenantCognitoId: null, email: null });
            } finally {
                setIsLoadingSession(false);
            }
        };

        fetchUserSession();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: userInfo.email || '',
            interests: [],
            privacyConsent: false,
            message: '',
        },
    });

    // Update form email when userInfo changes
    useEffect(() => {
        if (userInfo.email) {
            setValue('email', userInfo.email);
        }
    }, [userInfo.email, setValue]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        let cognitoId: string | null = null;

        try {
            if (userInfo?.tenantCognitoId && userInfo.tenantCognitoId.trim() !== '') {
                cognitoId = userInfo.tenantCognitoId;
            }

            const payload = {
                ...data,
                cognitoId, // Changed from tenantCognitoId
                interests: data.interests.join(', '),
                message: data.message || '',
            };

            console.log('Submitting payload:', payload, { userInfo });

            await createContact(payload).unwrap();

            reset();
            toast.success('Subscription successful! Check your email for confirmation.');
        } catch (error: any) {
            console.error('Submission error:', error, { userInfo, payload: { ...data, cognitoId } });
            toast.error(error?.data?.message || 'Failed to subscribe. Please try again.');
        }
    };

    return (
        <div className="relative py-20 bg-white overflow-hidden">
            <Toaster position="top-right" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Join Our Exclusive <span className="text-blue-600">Real Estate</span> Community
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Get curated property insights, market updates, and exclusive listings delivered straight to your inbox.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="ml-3 text-gray-700">
                                    Weekly market analysis reports
                                </p>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="ml-3 text-gray-700">
                                    First access to off-market properties
                                </p>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="ml-3 text-gray-700">
                                    Expert investment advice
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 sm:p-10">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Subscribe Now
                            </h3>
                            <p className="text-gray-600">
                                Join 15,000+ subscribers getting premium insights
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className="grid gap-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Daniel Kepha"
                                            {...register('name')}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.name ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            aria-invalid={errors.name ? 'true' : 'false'}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="your@email.com"
                                            {...register('email')}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            aria-invalid={errors.email ? 'true' : 'false'}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Your Message (Optional)
                                    </label>
                                    <textarea
                                        id="message"
                                        placeholder="Share any specific requests or comments..."
                                        {...register('message')}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.message ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        rows={4}
                                        aria-invalid={errors.message ? 'true' : 'false'}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        What interests you? (Select at least one)
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {interestOptions.map((interest) => (
                                            <label key={interest.id} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    value={interest.id}
                                                    {...register('interests')}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <span className="text-sm text-gray-700">{interest.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.interests && (
                                        <p className="mt-1 text-sm text-red-600">{errors.interests.message}</p>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="privacyConsent"
                                                type="checkbox"
                                                {...register('privacyConsent')}
                                                className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                                                    errors.privacyConsent ? 'border-red-500' : ''
                                                }`}
                                                aria-invalid={errors.privacyConsent ? 'true' : 'false'}
                                            />
                                        </div>
                                        <label htmlFor="privacyConsent" className="ml-3 text-sm text-gray-600">
                                            I agree to the{' '}
                                            <a href="/privacy" className="text-blue-600 hover:underline">
                                                Privacy Policy
                                            </a>{' '}
                                            and consent to receiving communications.
                                        </label>
                                    </div>
                                    {errors.privacyConsent && (
                                        <p className="mt-1 text-sm text-red-600">{errors.privacyConsent.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || isLoadingSession}
                                    className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none transition-colors ${
                                        isSubmitting || isLoadingSession ? 'cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"></span>
                                            Processing...
                                        </>
                                    ) : isLoadingSession ? (
                                        'Loading...'
                                    ) : (
                                        'Get Exclusive Access'
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>Unsubscribe anytime. We respect your privacy.</p>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="mt-16">
                    <h3 className="text-center text-2xl font-bold text-gray-900 mb-8">
                        What Our Subscribers Say
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <div className="flex-shrink-0">
                                    <Image
                                        src="/placeholder-avatar1.png"
                                        alt="Sarah J."
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="ml-3">
                                    <h4 className="font-medium text-gray-900">K Daniel</h4>
                                    <p className="text-sm text-gray-500">Investor</p>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                &#34;The market reports helped me identify the perfect time to buy my first investment property. Made a 20% ROI in the first year!&#34;
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <div className="flex-shrink-0">
                                    <Image
                                        src="/placeholder-avatar2.png"
                                        alt="K Daniel"
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="ml-3">
                                    <h4 className="font-medium text-gray-900">Kepha Daniel</h4>
                                    <p className="text-sm text-gray-500">First-time Buyer</p>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                &#34;Got access to a property before it hit the market. The neighborhood guides were incredibly helpful in making our decision.&#34;
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <div className="flex-shrink-0">
                                    <Image
                                        src="/placeholder-avatar3.png"
                                        alt="Daniel K."
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />

                                </div>
                                <div className="ml-3">
                                    <h4 className="font-medium text-gray-900">Daniel K.</h4>
                                    <p className="text-sm text-gray-500">Real Estate Agent</p>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                &#34;The investment tips have been invaluable for my clients. I regularly share insights from the newsletter in my consultations.&#34;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;