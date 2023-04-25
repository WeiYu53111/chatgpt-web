export function getCurrentDate() {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

export function isValidEmail(email: string): boolean {
	// 定义邮箱格式的正则表达式
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// 使用正则表达式测试邮箱地址，并返回结果
	return emailRegex.test(email);
}
