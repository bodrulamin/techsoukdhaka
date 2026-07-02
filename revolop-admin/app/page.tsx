/**
 * Home page - redirects to dashboard or login
 */

import { redirect } from 'next/navigation';

export default function Home() {
  // For now, redirect to login
  // TODO: Check auth token and redirect accordingly
  redirect('/login');
}
