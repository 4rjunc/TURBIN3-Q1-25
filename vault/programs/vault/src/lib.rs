use anchor_lang::prelude::*;

declare_id!("AfxaF4ELg5wf4xDU8avJiMZrFZ5bJUiT23D7y7TRjK38");

#[program]
pub mod vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
