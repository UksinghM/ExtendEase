'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function SignupPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Must contain an uppercase letter')
        .matches(/[0-9]/, 'Must contain a number')
        .matches(/[^A-Za-z0-9]/, 'Must contain a special character')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm your password'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setError('');
      setIsLoading(true);
      try {
        await axios.post('http://localhost:5000/user/add', {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        });
        setIsLoading(false);
        router.push('/login');
      } catch (err) {
        setIsLoading(false);
        setError(
          err.response?.data?.message || 'Signup failed. Please try again.'
        );
      }
    },
  });

  return (
    <div className="relative h- flex items-center justify-center my-8 mx-8">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center animate-pulse"
        style={{
          backgroundImage: `url('/abstract.jpg')`,
          filter: 'blur(8px)',
        }}
      ></div>

      {/* Glass overlay (optional) */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[6px] z-0" />

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-xl p-8 sm:p-10 bg-white rounded-2xl shadow-xl">
        {/* Logo (top-left inside box) */}
        <div className="mb-6 flex items-center">
          <img src="/Final Logo.ico" alt="Logo" className="h-24 w-26 mr-3" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Sign-Up</h1>
        <p className="text-sm text-indigo-500 mb-6">Create an online account with just a few clicks.</p>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Name section */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="First"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="text-xs text-red-600 mt-1">{formik.errors.firstName}</div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Last"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-xs text-red-600 mt-1">{formik.errors.lastName}</div>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-xs text-red-600 mt-1">{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Create a password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-xs text-red-600 mt-1">{formik.errors.password}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Re-enter your password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-xs text-red-600 mt-1">{formik.errors.confirmPassword}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-700 hover:bg-indigo-400 text-white font-semibold py-2 rounded-md transition"
          >
            {isLoading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-700 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
