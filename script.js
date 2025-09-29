// script.js
// DOM Elements
const fabBtn = document.getElementById('fabBtn');
const transactionModal = document.getElementById('transactionModal');
const closeModal = document.getElementById('closeModal');
const transactionForm = document.getElementById('transactionForm');
const filterBtn = document.getElementById('filterBtn');
const filterMenu = document.getElementById('filterMenu');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const transactionList = document.getElementById('transactionList');
const currentBalanceEl = document.getElementById('currentBalance');
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpensesEl = document.getElementById('totalExpenses');
const modalTitle = document.getElementById('modalTitle');
const submitBtn = document.getElementById('submitBtn');
const exportBtn = document.getElementById('exportBtn');
const clearBtn = document.getElementById('clearBtn');
const confirmModal = document.getElementById('confirmModal');
const confirmTitle = document.getElementById('confirmTitle');
const confirmMessage = document.getElementById('confirmMessage');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');

// Player stats elements
const playerHealthEl = document.getElementById('playerHealth');
const playerManaEl = document.getElementById('playerMana');
const playerArmorEl = document.getElementById('playerArmor');
const playerSpellEl = document.getElementById('playerSpell');
const playerRankEl = document.getElementById('playerRank');
const healthBar = document.getElementById('healthBar');
const manaBar = document.getElementById('manaBar');

// Help Elements
const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const closeHelpModal = document.getElementById('closeHelpModal');

// Import Elements
const importBtn = document.getElementById('importBtn');
const importModal = document.getElementById('importModal');
const closeImportModal = document.getElementById('closeImportModal');
const csvFileInput = document.getElementById('csvFileInput');
const importSubmitBtn = document.getElementById('importSubmitBtn');

// Welcome Modal Elements
const welcomeModal = document.getElementById('welcomeModal');
const closeWelcomeModal = document.getElementById('closeWelcomeModal');
const startQuestBtn = document.getElementById('startQuestBtn');
const welcomeMessage = document.getElementById('welcomeMessage');

// Chart Elements
const chartDropdownBtn = document.getElementById('chartDropdownBtn');
const chartDropdownMenu = document.getElementById('chartDropdownMenu');
const currentChartPeriod = document.getElementById('currentChartPeriod');
const chartDropdownOptions = document.querySelectorAll('.chart-dropdown-option');
const spendingChart = document.getElementById('spendingChart');

// Quote Elements
const quoteText = document.getElementById('quoteText');
const refreshQuoteBtn = document.getElementById('refreshQuoteBtn');

// Toggle Options
const toggleOptions = document.querySelectorAll('.toggle-option');
let transactionType = 'income';

// Filter Options
const filterOptions = document.querySelectorAll('.filter-option');
let currentFilter = 'today';

// Transactions storage
let transactions = [];
let editingTransactionId = null;
let myChart = null;

// Random RPG greetings
const rpgGreetings = [
    "Welcome to Treasure Ledger, brave adventurer! May your treasury grow ever larger!",
    "Hail, traveler! Your quest for financial glory begins now!",
    "Greetings, noble hero! Manage your gold with wisdom and courage!",
    "Well met, warrior! Prepare to conquer your financial quests!",
    "Ahoy, matey! Set sail on the seas of treasure and wealth!",
    "Greetings, dungeon crawler! Your journey to financial mastery starts here!",
    "Welcome, treasure hunter! May your coffers overflow with gold!",
    "Hark, brave soul! Your ledger of destiny awaits!",
    "Greetings, gold seeker! Forge your path to riches!",
    "Welcome, coin master! May your fortune shine like the sun!",
    "Hail, ledger keeper! Balance your books with honor!",
    "Greetings, wealth wizard! Cast your spells of prosperity!",
    "Welcome, fortune fighter! Battle your expenses to victory!",
    "Hark, coin collector! Gather your riches with pride!",
    "Greetings, treasury guardian! Protect your gold with wisdom!"
];

// Random spells
const spells = [
    "Gold Rush",
    "Treasure Find",
    "Coin Flip",
    "Wealth Ward",
    "Fortune's Favor",
    "Merchant's Charm",
    "Loot Locator",
    "Riches Ritual",
    "Money Magnet",
    "Gilded Shield",
    "Coin Collector",
    "Treasure Tracker",
    "Gold Generator",
    "Wealth Whisper",
    "Profit Protection"
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set current datetime
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    document.getElementById('datetime').value = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    // Load transactions from localStorage
    loadTransactionsFromStorage();
    
    // Initialize chart
    initChart();
    
    // Set initial filter to 'today'
    currentFilter = 'today';
    const todayFilterOption = document.querySelector('.filter-option[data-filter="today"]');
    if (todayFilterOption) {
        filterBtn.innerHTML = `${todayFilterOption.textContent} <i class="fas fa-chevron-down"></i>`;
        todayFilterOption.classList.add('active');
    }
    
    // Apply initial filter
    filterTransactions(currentFilter);
    
    // Generate random player stats
    generatePlayerStats();
    
    // Show welcome modal after a short delay
    setTimeout(showRandomGreeting, 500);
    
    // Display random quote
    displayRandomQuote();
    
    // Add event listener for quote refresh button
    refreshQuoteBtn.addEventListener('click', displayRandomQuote);
});

// Generate random player stats
function generatePlayerStats() {
    // Generate random health (between 500-1000)
    const health = Math.floor(Math.random() * 501) + 500;
    playerHealthEl.textContent = `${health}/1000`;
    healthBar.style.width = `${(health / 1000) * 100}%`;
    
    // Generate random mana (between 50-100)
    const mana = Math.floor(Math.random() * 51) + 50;
    playerManaEl.textContent = `${mana}/100`;
    manaBar.style.width = `${mana}%`;
    
    // Generate random armor (between 10-99)
    const armor = Math.floor(Math.random() * 90) + 10;
    playerArmorEl.textContent = armor;
    
    // Generate random spell
    const randomSpell = spells[Math.floor(Math.random() * spells.length)];
    playerSpellEl.textContent = randomSpell;
    
    // Generate random rank (between 1-10 out of 9442)
    const rank = Math.floor(Math.random() * 10) + 1;
    playerRankEl.textContent = `${rank}/9442`;
}

// Show random welcome message
function showRandomGreeting() {
    const randomIndex = Math.floor(Math.random() * rpgGreetings.length);
    welcomeMessage.textContent = rpgGreetings[randomIndex];
    welcomeModal.classList.add('active');
}

// Display random warrior quote
function displayRandomQuote() {
    if (typeof warriorQuotes !== 'undefined' && warriorQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * warriorQuotes.length);
        quoteText.textContent = `"${warriorQuotes[randomIndex]}"`;
    }
}

// Load transactions from localStorage
function loadTransactionsFromStorage() {
    const storedTransactions = localStorage.getItem('wortifuTransactions');
    
    if (storedTransactions) {
        try {
            transactions = JSON.parse(storedTransactions);
            
            // Convert date strings back to Date objects
            transactions = transactions.map(transaction => ({
                ...transaction,
                datetime: new Date(transaction.datetime)
            }));
            
            // Add transactions to UI
            transactions.forEach(transaction => {
                addTransactionToUI(transaction);
            });
            
            // Calculate and display balances
            calculateBalances();
            
            // Update chart
            updateChartBasedOnTransactions();
        } catch (e) {
            console.error('Failed to parse transactions from localStorage', e);
            transactions = [];
        }
    } else {
        transactions = [];
    }
}

// Save transactions to localStorage
function saveTransactionsToStorage() {
    try {
        localStorage.setItem('wortifuTransactions', JSON.stringify(transactions));
    } catch (e) {
        console.error('Failed to save transactions to localStorage', e);
    }
}

// Calculate and display balances
function calculateBalances() {
    let totalIncome = 0;
    let totalExpenses = 0;
    
    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });
    
    const currentBalance = totalIncome - totalExpenses;
    
    currentBalanceEl.textContent = `${formatGold(currentBalance)}`;
    totalIncomeEl.textContent = `${formatGold(totalIncome)}`;
    totalExpensesEl.textContent = `${formatGold(totalExpenses)}`;
    
    // Update player stats based on balance
    updatePlayerStatsBasedOnBalance(currentBalance, totalIncome, totalExpenses);
}

// Update player stats based on balance
function updatePlayerStatsBasedOnBalance(balance, income, expenses) {
    // Update health based on balance (higher balance = higher health)
    const healthPercentage = Math.min(100, Math.max(10, Math.floor((balance / 10000) * 100)));
    const health = Math.floor((healthPercentage / 100) * 1000);
    playerHealthEl.textContent = `${health}/1000`;
    healthBar.style.width = `${healthPercentage}%`;
    
    // Update mana based on recent transactions (more transactions = more mana used)
    const recentTransactions = transactions.filter(t => {
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        return new Date(t.datetime) >= oneDayAgo;
    });
    
    const manaUsed = Math.min(100, recentTransactions.length * 5);
    const mana = 100 - manaUsed;
    playerManaEl.textContent = `${mana}/100`;
    manaBar.style.width = `${mana}%`;
    
    // Update armor based on total income (higher income = better armor)
    const armor = Math.min(99, Math.floor(income / 10000));
    playerArmorEl.textContent = armor;
    
    // Update rank based on balance compared to expenses
    const rank = Math.max(1, Math.min(10, 10 - Math.floor((expenses / Math.max(1, income)) * 10)));
    playerRankEl.textContent = `${rank}/9442`;
    
    // Update spell based on the type of last transaction
    if (transactions.length > 0) {
        const lastTransaction = transactions[0];
        if (lastTransaction.type === 'income') {
            playerSpellEl.textContent = "Gold Rush";
        } else {
            playerSpellEl.textContent = "Treasure Find";
        }
    }
}

// Format Gold
function formatGold(amount) {
    if (amount >= 10000) {
        const platinum = Math.floor(amount / 10000);
        const gold = amount % 10000;
        return `${platinum}P ${gold}G`;
    }
    return `${amount}G`;
}

// Format IDR
function formatIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// FAB Button
fabBtn.addEventListener('click', () => {
    resetForm();
    transactionModal.classList.add('active');
});

// Help Button
helpBtn.addEventListener('click', () => {
    helpModal.classList.add('active');
});

// Close Help Modal
closeHelpModal.addEventListener('click', () => {
    helpModal.classList.remove('active');
});

// Close Welcome Modal
closeWelcomeModal.addEventListener('click', () => {
    welcomeModal.classList.remove('active');
});

startQuestBtn.addEventListener('click', () => {
    welcomeModal.classList.remove('active');
});

// Close Modal
closeModal.addEventListener('click', () => {
    transactionModal.classList.remove('active');
});

// Close Import Modal
closeImportModal.addEventListener('click', () => {
    importModal.classList.remove('active');
});

// Close Modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === transactionModal) {
        transactionModal.classList.remove('active');
    }
    if (e.target === importModal) {
        importModal.classList.remove('active');
    }
    if (e.target === helpModal) {
        helpModal.classList.remove('active');
    }
    if (e.target === welcomeModal) {
        welcomeModal.classList.remove('active');
    }
});

// Transaction Type Toggle
toggleOptions.forEach(option => {
    option.addEventListener('click', () => {
        toggleOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        transactionType = option.dataset.type;
        
        // Update submit button style based on transaction type
        updateSubmitButtonStyle();
    });
});

// Update submit button style based on transaction type
function updateSubmitButtonStyle() {
    if (transactionType === 'income') {
        submitBtn.classList.remove('expense-btn');
        submitBtn.classList.add('income-btn');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Complete Quest';
    } else {
        submitBtn.classList.remove('income-btn');
        submitBtn.classList.add('expense-btn');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Complete Quest';
    }
}

// Form Submission
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const amount = parseInt(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    const datetime = document.getElementById('datetime').value;
    
    if (editingTransactionId) {
        // Update existing transaction
        const index = transactions.findIndex(t => t.id === editingTransactionId);
        if (index !== -1) {
            const oldTransaction = transactions[index];
            const newTransaction = {
                ...oldTransaction,
                type: transactionType,
                amount: amount,
                description: description,
                datetime: new Date(datetime)
            };
            
            // Update transaction in array
            transactions[index] = newTransaction;
            
            // Update UI
            updateTransactionInUI(newTransaction);
            
            // Update balances
            calculateBalances();
            
            // Update chart
            updateChartBasedOnTransactions();
            
            // Save to localStorage
            saveTransactionsToStorage();
            
            // Show notification
            showNotification('Quest updated successfully!');
        }
    } else {
        // Create new transaction
        const transaction = {
            id: Date.now(),
            type: transactionType,
            amount: amount,
            description: description,
            datetime: new Date(datetime)
        };
        
        // Add to transactions array
        transactions.unshift(transaction);
        
        // Add transaction to UI
        addTransactionToUI(transaction);
        
        // Update balances
        calculateBalances();
        
        // Update chart
        updateChartBasedOnTransactions();
        
        // Save to localStorage
        saveTransactionsToStorage();
        
        // Show notification
        showNotification('Quest completed successfully!');
    }
    
    // Reset form and close modal
    resetForm();
    transactionModal.classList.remove('active');
});

// Reset Form
function resetForm() {
    transactionForm.reset();
    editingTransactionId = null;
    modalTitle.innerHTML = '<i class="fas fa-plus-circle"></i> New Quest';
    
    // Reset to income
    toggleOptions.forEach(opt => opt.classList.remove('active'));
    document.querySelector('.toggle-option[data-type="income"]').classList.add('active');
    transactionType = 'income';
    
    // Set current datetime
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    document.getElementById('datetime').value = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    // Update submit button style
    updateSubmitButtonStyle();
}

// Filter Dropdown
filterBtn.addEventListener('click', () => {
    filterMenu.classList.toggle('active');
});

// Filter Options
filterOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options
        filterOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
        
        currentFilter = option.dataset.filter;
        filterBtn.innerHTML = `${option.textContent} <i class="fas fa-chevron-down"></i>`;
        filterMenu.classList.remove('active');
        
        // Apply the filter
        filterTransactions(currentFilter);
    });
});

// Chart Dropdown
chartDropdownBtn.addEventListener('click', () => {
    chartDropdownMenu.classList.toggle('active');
});

// Chart Dropdown Options
chartDropdownOptions.forEach(option => {
    option.addEventListener('click', () => {
        const period = option.dataset.period;
        currentChartPeriod.textContent = option.textContent.trim();
        
        // Update active state
        chartDropdownOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Close dropdown
        chartDropdownMenu.classList.remove('active');
        
        // Update chart
        updateChart(period);
    });
});

// Import Button
importBtn.addEventListener('click', () => {
    importModal.classList.add('active');
});

// Import Submit Button
importSubmitBtn.addEventListener('click', () => {
    const file = csvFileInput.files[0];
    if (!file) {
        showNotification('Please select a CSV file');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const csv = e.target.result;
        parseCSV(csv);
    };
    reader.readAsText(file);
    
    importModal.classList.remove('active');
});

// Parse CSV
function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
    
    // Check if required headers are present
    const requiredHeaders = ['date', 'type', 'amount', 'description'];
    const hasAllHeaders = requiredHeaders.every(header => 
        headers.some(h => h.includes(header))
    );
    
    if (!hasAllHeaders) {
        showNotification('CSV format is incorrect. Required headers: Date, Type, Amount, Description');
        return;
    }
    
    let importedCount = 0;
    let errorCount = 0;
    
    // Find header indices
    const dateIndex = headers.findIndex(h => h.includes('date'));
    const typeIndex = headers.findIndex(h => h.includes('type'));
    const amountIndex = headers.findIndex(h => h.includes('amount'));
    const descriptionIndex = headers.findIndex(h => h.includes('description'));
    
    // Process each line (skip header)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Parse CSV line
        const values = parseCSVLine(line);
        
        if (values.length < 4) {
            errorCount++;
            continue;
        }
        
        try {
            const dateStr = values[dateIndex];
            const typeStr = values[typeIndex].toLowerCase();
            const amountStr = values[amountIndex];
            const description = values[descriptionIndex];
            
            // Parse date - try multiple formats
            let date;
            
            // Try DD/MM/YYYY HH:MM:SS format
            if (dateStr.includes('/')) {
                const parts = dateStr.split(' ');
                const dateParts = parts[0].split('/');
                const timeParts = parts[1] ? parts[1].split(':') : ['0', '0', '0'];
                
                if (dateParts.length === 3) {
                    const day = parseInt(dateParts[0]);
                    const month = parseInt(dateParts[1]) - 1; // JS months are 0-indexed
                    const year = parseInt(dateParts[2]);
                    const hours = parseInt(timeParts[0]);
                    const minutes = parseInt(timeParts[1]);
                    const seconds = parseInt(timeParts[2] || 0);
                    
                    date = new Date(year, month, day, hours, minutes, seconds);
                }
            }
            
            // Try ISO format if previous attempt failed
            if (!date || isNaN(date.getTime())) {
                date = new Date(dateStr);
            }
            
            // Validate date
            if (isNaN(date.getTime())) {
                errorCount++;
                console.error(`Invalid date format: ${dateStr}`);
                continue;
            }
            
            // Parse type - handle both "IN"/"OUT" and "income"/"expense"
            let type;
            if (typeStr === 'in') {
                type = 'income';
            } else if (typeStr === 'out') {
                type = 'expense';
            } else if (typeStr === 'income' || typeStr === 'expense') {
                type = typeStr;
            } else {
                errorCount++;
                console.error(`Invalid type: ${typeStr}`);
                continue;
            }
            
            // Parse amount
            const amount = parseInt(amountStr.replace(/[^\d]/g, ''));
            if (isNaN(amount) || amount <= 0) {
                errorCount++;
                console.error(`Invalid amount: ${amountStr}`);
                continue;
            }
            
            // Create transaction
            const transaction = {
                id: Date.now() + i,
                type: type,
                amount: amount,
                description: description,
                datetime: date
            };
            
            // Add to transactions array
            transactions.unshift(transaction);
            
            // Add to UI
            addTransactionToUI(transaction);
            
            importedCount++;
        } catch (e) {
            console.error('Error parsing transaction:', e);
            errorCount++;
        }
    }
    
    // Update balances and chart
    calculateBalances();
    updateChartBasedOnTransactions();
    
    // Save to localStorage
    saveTransactionsToStorage();
    
    // Show notification
    let message = `Imported ${importedCount} quests.`;
    if (errorCount > 0) {
        message += ` ${errorCount} errors occurred.`;
    }
    showNotification(message);
    
    // Reset file input
    csvFileInput.value = '';
}

// Parse CSV line (handles quoted fields)
function parseCSVLine(line) {
    const result = [];
    let start = 0;
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
            inQuotes = !inQuotes;
        } else if (line[i] === ',' && !inQuotes) {
            result.push(line.substring(start, i).replace(/^"|"$/g, ''));
            start = i + 1;
        }
    }
    
    // Add the last field
    result.push(line.substring(start).replace(/^"|"$/g, ''));
    
    return result;
}

// Export Button
exportBtn.addEventListener('click', () => {
    exportToCSV();
});

// Clear All Button
clearBtn.addEventListener('click', () => {
    if (transactions.length === 0) {
        showNotification('No quests to clear');
        return;
    }
    
    confirmTitle.innerHTML = '<i class="fas fa-trash-alt"></i> Clear All Quests';
    confirmMessage.textContent = 'Are you sure you want to delete all quests? This action cannot be undone.';
    confirmModal.classList.add('active');
    
    confirmYes.onclick = () => {
        // Clear transactions
        transactions = [];
        
        // Clear UI
        transactionList.innerHTML = '';
        
        // Reset balances
        currentBalanceEl.textContent = formatGold(0);
        totalIncomeEl.textContent = formatGold(0);
        totalExpensesEl.textContent = formatGold(0);
        
        // Update chart
        updateChartBasedOnTransactions();
        
        // Save to localStorage
        saveTransactionsToStorage();
        
        // Close modal
        confirmModal.classList.remove('active');
        
        // Show notification
        showNotification('All quests cleared successfully!');
    };
});

// Confirmation Modal
confirmNo.addEventListener('click', () => {
    confirmModal.classList.remove('active');
});

// Close confirmation modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === confirmModal) {
        confirmModal.classList.remove('active');
    }
});

// Add Transaction to UI
function addTransactionToUI(transaction) {
    const transactionItem = document.createElement('div');
    transactionItem.className = 'transaction-item';
    transactionItem.dataset.id = transaction.id;
    
    const date = new Date(transaction.datetime);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    transactionItem.innerHTML = `
        <div class="transaction-left">
            <div class="transaction-icon ${transaction.type}-icon">
                <i class="fas ${transaction.type === 'income' ? 'fa-gem' : 'fa-skull-crossbones'}"></i>
            </div>
            <div class="transaction-details">
                <div class="transaction-desc">${transaction.description}</div>
                <div class="transaction-date">${formattedDate} at ${formattedTime}</div>
            </div>
        </div>
        <div class="transaction-amount ${transaction.type}-amount">
            ${transaction.type === 'income' ? '+' : '-'}${formatGold(transaction.amount)}
        </div>
        <div class="transaction-buttons">
            <button class="transaction-btn edit-btn" data-id="${transaction.id}" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="transaction-btn delete-btn" data-id="${transaction.id}" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
            <button class="transaction-btn copy-btn" data-id="${transaction.id}" title="Copy Command">
                <i class="fas fa-copy"></i>
            </button>
        </div>
    `;
    
    // Add to the top of the list
    if (transactionList.firstChild) {
        transactionList.insertBefore(transactionItem, transactionList.firstChild);
    } else {
        transactionList.appendChild(transactionItem);
    }
    
    // Add event listeners
    const editBtn = transactionItem.querySelector('.edit-btn');
    const deleteBtn = transactionItem.querySelector('.delete-btn');
    const copyBtn = transactionItem.querySelector('.copy-btn');
    
    editBtn.addEventListener('click', () => editTransaction(transaction.id));
    deleteBtn.addEventListener('click', () => deleteTransaction(transaction.id));
    copyBtn.addEventListener('click', () => copyTelegramCommand(transaction.id));
}

// Update Transaction in UI
function updateTransactionInUI(transaction) {
    const transactionItem = document.querySelector(`.transaction-item[data-id="${transaction.id}"]`);
    if (!transactionItem) return;
    
    const date = new Date(transaction.datetime);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    transactionItem.innerHTML = `
        <div class="transaction-left">
            <div class="transaction-icon ${transaction.type}-icon">
                <i class="fas ${transaction.type === 'income' ? 'fa-gem' : 'fa-skull-crossbones'}"></i>
            </div>
            <div class="transaction-details">
                <div class="transaction-desc">${transaction.description}</div>
                <div class="transaction-date">${formattedDate} at ${formattedTime}</div>
            </div>
        </div>
        <div class="transaction-amount ${transaction.type}-amount">
            ${transaction.type === 'income' ? '+' : '-'}${formatGold(transaction.amount)}
        </div>
        <div class="transaction-buttons">
            <button class="transaction-btn edit-btn" data-id="${transaction.id}" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="transaction-btn delete-btn" data-id="${transaction.id}" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
            <button class="transaction-btn copy-btn" data-id="${transaction.id}" title="Copy Command">
                <i class="fas fa-copy"></i>
            </button>
        </div>
    `;
    
    // Re-add event listeners
    const editBtn = transactionItem.querySelector('.edit-btn');
    const deleteBtn = transactionItem.querySelector('.delete-btn');
    const copyBtn = transactionItem.querySelector('.copy-btn');
    
    editBtn.addEventListener('click', () => editTransaction(transaction.id));
    deleteBtn.addEventListener('click', () => deleteTransaction(transaction.id));
    copyBtn.addEventListener('click', () => copyTelegramCommand(transaction.id));
}

// Edit Transaction
function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;
    
    // Set form values
    document.getElementById('amount').value = transaction.amount;
    document.getElementById('description').value = transaction.description;
    
    const year = transaction.datetime.getFullYear();
    const month = String(transaction.datetime.getMonth() + 1).padStart(2, '0');
    const day = String(transaction.datetime.getDate()).padStart(2, '0');
    const hours = String(transaction.datetime.getHours()).padStart(2, '0');
    const minutes = String(transaction.datetime.getMinutes()).padStart(2, '0');
    
    document.getElementById('datetime').value = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    // Set transaction type
    toggleOptions.forEach(opt => opt.classList.remove('active'));
    document.querySelector(`.toggle-option[data-type="${transaction.type}"]`).classList.add('active');
    transactionType = transaction.type;
    
    // Set editing mode
    editingTransactionId = id;
    modalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Quest';
    
    // Update submit button style
    updateSubmitButtonStyle();
    
    // Open modal
    transactionModal.classList.add('active');
}

// Delete Transaction
function deleteTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;
    
    confirmTitle.innerHTML = '<i class="fas fa-trash"></i> Delete Quest';
    confirmMessage.textContent = 'Are you sure you want to delete this quest?';
    confirmModal.classList.add('active');
    
    confirmYes.onclick = () => {
        // Remove from array
        transactions = transactions.filter(t => t.id !== id);
        
        // Remove from UI
        const transactionItem = document.querySelector(`.transaction-item[data-id="${id}"]`);
        if (transactionItem) {
            transactionItem.remove();
        }
        
        // Update balances
        calculateBalances();
        
        // Update chart
        updateChartBasedOnTransactions();
        
        // Save to localStorage
        saveTransactionsToStorage();
        
        // Close modal
        confirmModal.classList.remove('active');
        
        // Show notification
        showNotification('Quest deleted successfully!');
    };
}

// Copy Telegram Command
function copyTelegramCommand(id) {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;
    
    const command = transaction.type === 'income' 
        ? `.in ${transaction.amount} ${transaction.description}` 
        : `.out ${transaction.amount} ${transaction.description}`;
    
    copyToClipboard(command);
    showNotification(`Command copied: ${command}`);
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Show Notification
function showNotification(message) {
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Filter Transactions
function filterTransactions(filter) {
    const transactionItems = document.querySelectorAll('.transaction-item');
    const today = new Date();
    
    transactionItems.forEach(item => {
        // Get the transaction ID from the data attribute
        const transactionId = parseInt(item.dataset.id);
        
        // Find the corresponding transaction in our data array
        const transaction = transactions.find(t => t.id === transactionId);
        
        if (!transaction) {
            item.style.display = 'none';
            return;
        }
        
        // Use the actual transaction date for filtering (not the UI string)
        const transactionDate = new Date(transaction.datetime);
        let show = false;
        
        if (filter === 'today') {
            // Compare dates without time
            show = transactionDate.toDateString() === today.toDateString();
        } else if (filter === 'week') {
            // Get the start of the week (Monday)
            const startOfWeek = new Date(today);
            const day = today.getDay();
            const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
            startOfWeek.setDate(diff);
            startOfWeek.setHours(0, 0, 0, 0);
            
            // Get the end of the week (Sunday)
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);
            
            show = transactionDate >= startOfWeek && transactionDate <= endOfWeek;
        } else if (filter === 'month') {
            show = transactionDate.getMonth() === today.getMonth() && 
                   transactionDate.getFullYear() === today.getFullYear();
        } else if (filter === 'year') {
            show = transactionDate.getFullYear() === today.getFullYear();
        }
        
        item.style.display = show ? 'flex' : 'none';
    });
}

// Export to CSV
function exportToCSV() {
    if (transactions.length === 0) {
        showNotification('No quests to export');
        return;
    }
    
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,Type,Amount,Description\n";
    
    transactions.forEach(transaction => {
        const date = new Date(transaction.datetime);
        // Format date as DD/MM/YYYY HH:MM:SS
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        
        csvContent += `${formattedDate},${transaction.type},${transaction.amount},"${transaction.description}"\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `treasury_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Remove link
    document.body.removeChild(link);
    
    // Show notification
    showNotification('Quests exported successfully!');
}

// Initialize Chart
function initChart() {
    const ctx = spendingChart.getContext('2d');
    
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Expenses',
                data: [],
                backgroundColor: 'rgba(244, 67, 54, 0.7)',
                borderColor: 'rgba(244, 67, 54, 1)',
                borderWidth: 2
            }, {
                label: 'Income',
                data: [],
                backgroundColor: 'rgba(76, 175, 80, 0.7)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderDash: [5, 5]
                    },
                    ticks: {
                        callback: function(value) {
                            return formatGold(value);
                        },
                        color: '#e0e0e0',
                        font: {
                            family: "'VT323', monospace",
                            size: 14
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#e0e0e0',
                        font: {
                            family: "'VT323', monospace",
                            size: 14
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 30, 30, 0.9)',
                    titleColor: '#e0e0e0',
                    bodyColor: '#e0e0e0',
                    titleFont: {
                        family: "'VT323', monospace",
                        size: 16
                    },
                    bodyFont: {
                        family: "'VT323', monospace",
                        size: 14
                    },
                    borderColor: '#444',
                    borderWidth: 1,
                    cornerRadius: 0,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += formatGold(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
    
    // Update with initial data
    updateChartBasedOnTransactions();
}

// Get Chart Data Based on Period
function getChartData(period) {
    const today = new Date();
    const incomeData = [];
    const expenseData = [];
    let labels = [];
    
    if (period === 'today') {
        // For today, we'll show hourly data from 6AM to 9PM
        labels = ['Dawn', 'Morning', 'Noon', 'Afternoon', 'Evening', 'Night'];
        
        // Initialize with zeros
        for (let i = 0; i < labels.length; i++) {
            incomeData.push(0);
            expenseData.push(0);
        }
        
        // Aggregate transactions by time of day
        transactions.forEach(transaction => {
            const transDate = new Date(transaction.datetime);
            
            // Check if transaction is from today
            if (transDate.toDateString() === today.toDateString()) {
                const hour = transDate.getHours();
                let timeIndex;
                
                if (hour >= 6 && hour < 9) timeIndex = 0; // Dawn
                else if (hour >= 9 && hour < 12) timeIndex = 1; // Morning
                else if (hour >= 12 && hour < 15) timeIndex = 2; // Noon
                else if (hour >= 15 && hour < 18) timeIndex = 3; // Afternoon
                else if (hour >= 18 && hour < 21) timeIndex = 4; // Evening
                else timeIndex = 5; // Night
                
                if (transaction.type === 'income') {
                    incomeData[timeIndex] += transaction.amount;
                } else {
                    expenseData[timeIndex] += transaction.amount;
                }
            }
        });
    } else if (period === 'week') {
        labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
        // Initialize with zeros
        for (let i = 0; i < labels.length; i++) {
            incomeData.push(0);
            expenseData.push(0);
        }
        
        // Aggregate transactions by day of week
        transactions.forEach(transaction => {
            const transDate = new Date(transaction.datetime);
            const dayOfWeek = transDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
            const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert to 0=Monday, 6=Sunday
            
            // Check if transaction is from this week
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)); // Set to Monday of this week
            weekStart.setHours(0, 0, 0, 0);
            
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            weekEnd.setHours(23, 59, 59, 999);
            
            if (transDate >= weekStart && transDate <= weekEnd) {
                if (transaction.type === 'income') {
                    incomeData[dayIndex] += transaction.amount;
                } else {
                    expenseData[dayIndex] += transaction.amount;
                }
            }
        });
    } else if (period === 'month') {
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        
        // Initialize with zeros
        for (let i = 0; i < labels.length; i++) {
            incomeData.push(0);
            expenseData.push(0);
        }
        
        // Aggregate transactions by week of month
        transactions.forEach(transaction => {
            const transDate = new Date(transaction.datetime);
            
            // Check if transaction is from this month
            if (transDate.getMonth() === today.getMonth() && transDate.getFullYear() === today.getFullYear()) {
                const dayOfMonth = transDate.getDate();
                const weekIndex = Math.min(Math.floor((dayOfMonth - 1) / 7), 3); // 0-3 for 4 weeks
                
                if (transaction.type === 'income') {
                    incomeData[weekIndex] += transaction.amount;
                } else {
                    expenseData[weekIndex] += transaction.amount;
                }
            }
        });
    } else if (period === 'year') {
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Initialize with zeros
        for (let i = 0; i < labels.length; i++) {
            incomeData.push(0);
            expenseData.push(0);
        }
        
        // Aggregate transactions by month
        transactions.forEach(transaction => {
            const transDate = new Date(transaction.datetime);
            
            // Check if transaction is from this year
            if (transDate.getFullYear() === today.getFullYear()) {
                const monthIndex = transDate.getMonth();
                
                if (transaction.type === 'income') {
                    incomeData[monthIndex] += transaction.amount;
                } else {
                    expenseData[monthIndex] += transaction.amount;
                }
            }
        });
    }
    
    return { labels, incomeData, expenseData };
}

// Update Chart
function updateChart(period) {
    if (!myChart) return;
    
    const { labels, incomeData, expenseData } = getChartData(period);
    
    myChart.data.labels = labels;
    myChart.data.datasets[0].data = expenseData;
    myChart.data.datasets[1].data = incomeData;
    myChart.update();
}

// Update Chart Based on Transactions
function updateChartBasedOnTransactions() {
    if (!myChart) return;
    
    // Get the active period from the dropdown
    const activeOption = document.querySelector('.chart-dropdown-option.active');
    if (activeOption) {
        updateChart(activeOption.dataset.period);
    }
}

// Display random warrior quote with decrypt animation
function displayRandomQuote() {
    if (typeof warriorQuotes !== 'undefined' && warriorQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * warriorQuotes.length);
        const quote = `"${warriorQuotes[randomIndex]}"`;
        
        // Get the quote text element
        const quoteElement = document.getElementById('quoteText');
        
        // Add decrypting class for animation effect
        quoteElement.classList.add('decrypting');
        
        // Clear the current quote
        quoteElement.textContent = '';
        
        // Create a span for each character to animate them individually
        const chars = quote.split('');
        quoteElement.innerHTML = '';
        
        // Add each character as a span with a delay for the animation
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('decrypt-char');
            span.style.animationDelay = `${index * 0.05}s`;
            quoteElement.appendChild(span);
        });
        
        // Remove the decrypting class after animation completes
        setTimeout(() => {
            quoteElement.classList.remove('decrypting');
        }, chars.length * 50 + 500);
    }
}