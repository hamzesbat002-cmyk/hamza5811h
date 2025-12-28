
import asyncio
from playwright.async_api import async_playwright, TimeoutError

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Add a listener for any console errors
        page.on("console", lambda msg: print(f"Browser Console MSG: {msg.text()}"))

        try:
            print("Navigating to the page...")
            await page.goto("http://localhost:8000/code_editor/codemaster_fixed.html", timeout=10000)
            print("Navigation successful.")

            print("Waiting for the HTML editor to be visible...")
            await page.wait_for_selector(".CodeMirror", timeout=15000)

            print("Editor found! Taking a screenshot...")
            await page.screenshot(path="editor_screenshot.png")
            print("Screenshot 'editor_screenshot.png' taken successfully.")

        except TimeoutError as e:
            print(f"A timeout error occurred: {e}")
            print("The editor did not load within the specified time.")
            await page.screenshot(path="error_screenshot.png")
            print("Screenshot 'error_screenshot.png' taken to show the page state.")

        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            await page.screenshot(path="error_screenshot.png")

        finally:
            await browser.close()
            print("Browser closed.")

if __name__ == "__main__":
    asyncio.run(main())
