import React from "react"
import pages from "../utils/pages"
import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <section class="bg-white dark:bg-gray-900 ">
      <div class="container flex items-center min-h-screen mx-auto">
        <div>
          <p class="text-sm font-medium text-blue-500 dark:text-blue-400">404 error</p>
          <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Страница не найдена</h1>
          <p class="mt-4 text-gray-500 dark:text-gray-400">Cтраница, которую вы ищете, не существует.</p>

          <div class="flex items-center mt-6 gap-x-3">
            <button class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
              <Link to={pages.tasks}>На главную</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
