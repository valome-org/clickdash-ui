export function DashboardFooter() {
  return (
    <div className='py-4 text-center text-sm text-slate-500 dark:text-slate-400'>
      <p>
        Powered by AI Dashboard Generator • {new Date().getFullYear()} •{" "}
        <a
          href='https://github.com/valome-org/clickdash-ui'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 dark:text-blue-400 hover:underline'
        >
          GitHub
        </a>
      </p>
    </div>
  );
}
