use anchor_lang::prelude::*;

declare_id!("B7xXE92N35vPUFQtxtJ9ycnDqLRw3HtKqjNSdKgG4CP8");

#[program]
pub mod escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
