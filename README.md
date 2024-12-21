# I_Will_Win
## **Our project Database design **
![image](https://github.com/user-attachments/assets/d10fed1d-dbb3-4556-826c-62912520c4e2)
Made using Draw.io
## **Application Flow**

### **1. User Management**

#### **New User Registration**
- Users register by providing a **username**, **email**, and **password**.
- After successful registration, the user is redirected to the **Dashboard**.

#### **Existing User Login**
- Users log in with their registered **email** and **password**.
- Upon successful login, the user is redirected to the **Dashboard**.

#### **Persistent Sessions**
- Session management is implemented to keep users logged in until they explicitly log out.

---

### **2. Application Pages**

#### **Page 1: Main Dashboard (Portfolio Overview)**

**Purpose**: Displays an aggregated summary of the user's stock portfolio.

**Features**:
- **Table or Card Layout**: Lists the following details for each stock:
  - **Stock Name**: The full name of the company.
  - **Ticker Symbol**: The unique symbol of the stock.
  - **Buy Price**: The price at which the stock was bought.
  - **Current Price**: Fetched live using the Alpha Vantage API.
  - **Profit/Loss**: Real-time calculation based on the current price and buy price.
  - **Date of Purchase**: The date when the stock was added.
  - **Profit per Unit**: Breakdown of profit/loss per share.

- **Visual Summary**:
  - Portfolio performance trends (e.g., total profit/loss over time).
  - Stock allocation (e.g., pie chart of holdings by ticker).

**Actions**:
- **Add Stock**: Button linking to the stock addition form.
- **Refresh**: Updates the live stock prices using the Alpha Vantage API.

---

#### **Page 2: Stock Management Dashboard**

**Purpose**: Allows users to manage individual stock entries.

**Features**:
- **List View**:
  - Displays all stocks purchased by the user.
  - Details include:
    - **Company Name**
    - **Ticker**
    - **Buy Price**
    - **Quantity**

- **Edit**:
  - Opens a pre-filled form with existing details (excluding quantity and price fields).
  - Allows users to update stock details.

- **Delete**:
  - Removes the selected stock from the portfolio.
  - Includes a confirmation modal to prevent accidental deletions.

---

#### **Page 3: Stock Addition/Editing Form**

**Purpose**: Lets users add or update stock entries.

**Features**:

**Step 1: Company Search**
- Input field for entering the company name.
- Fetches a list of available tickers using the Alpha Vantage **SYMBOL_SEARCH** API.
- Displays a dropdown or list for users to select the correct ticker.

**Step 2: Display Current Stock Price**
- After selecting a ticker, fetches the **current stock price** using Alpha Vantage’s real-time API.
- Prefills the **buy price** field in the form (editable by the user).

**Step 3: Quantity Input**
- Users input the number of shares to buy.
- **Total Buy Price** is auto-calculated as:  
  `Buy Price × Quantity`.

**Submission**:
- Users submit the stock entry, which updates the portfolio on the **Main Dashboard**.

---

### **3. User Journey Example**

#### **New User**
1. Registers.
2. Lands on the **Dashboard**.
3. Adds stocks to their portfolio.

#### **Existing User**
1. Logs in.
2. Views the updated portfolio with live prices.
3. Adds, edits, or deletes stocks as needed.

#### **Adding a Stock**
1. Enters the company name.
2. Selects the appropriate ticker.
3. Reviews the stock price.
4. Inputs the quantity.
5. Submits the stock entry.

#### **Editing a Stock**
1. Opens the stock details.
2. Adjusts the quantity.
3. Saves changes.

#### **Portfolio Overview**
1. Checks total profit/loss.
2. Monitors individual stock performance.

---
